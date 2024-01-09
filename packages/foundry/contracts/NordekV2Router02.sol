pragma solidity ^0.8.20;

import "./interfaces/INordekV2Factory.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/INordekV2Router02.sol";
import "./libraries/NordekV2Library.sol";
import "./libraries/SafeMath.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IWNRK.sol";

contract NordekV2Router02 is INordekV2Router02 {
    using SafeMath for uint;

    address public immutable factory;
    address public immutable WNRK;

    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, "NordekV2Router: EXPIRED");
        _;
    }

    constructor(address _factory, address _WNRK) {
        factory = _factory;
        WNRK = _WNRK;
    }

    receive() external payable {
        assert(msg.sender == WNRK); // only accept NRK via fallback from the WNRK contract
    }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin
    ) internal virtual returns (uint amountA, uint amountB) {
        // create the pair if it doesn't exist yet
        if (INordekV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            INordekV2Factory(factory).createPair(tokenA, tokenB);
        }
        (uint reserveA, uint reserveB) = NordekV2Library.getReserves(
            factory,
            tokenA,
            tokenB
        );
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint amountBOptimal = NordekV2Library.quote(
                amountADesired,
                reserveA,
                reserveB
            );
            if (amountBOptimal <= amountBDesired) {
                require(
                    amountBOptimal >= amountBMin,
                    "NordekV2Router: INSUFFICIENT_B_AMOUNT"
                );
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = NordekV2Library.quote(
                    amountBDesired,
                    reserveB,
                    reserveA
                );
                assert(amountAOptimal <= amountADesired);
                require(
                    amountAOptimal >= amountAMin,
                    "NordekV2Router: INSUFFICIENT_A_AMOUNT"
                );
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (uint amountA, uint amountB, uint liquidity)
    {
        (amountA, amountB) = _addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );
        address pair = NordekV2Library.pairFor(factory, tokenA, tokenB);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
        liquidity = INordekV2Pair(pair).mint(to);
    }

    function addLiquidityNRK(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountNRKMin,
        address to,
        uint deadline
    )
        external
        payable
        virtual
        override
        ensure(deadline)
        returns (uint amountToken, uint amountNRK, uint liquidity)
    {
        (amountToken, amountNRK) = _addLiquidity(
            token,
            WNRK,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountNRKMin
        );
        address pair = NordekV2Library.pairFor(factory, token, WNRK);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWNRK(WNRK).deposit{value: amountNRK}();
        assert(IWNRK(WNRK).transfer(pair, amountNRK));
        liquidity = INordekV2Pair(pair).mint(to);
        // refund dust NRK, if any
        if (msg.value > amountNRK)
            TransferHelper.safeTransferNRK(msg.sender, msg.value - amountNRK);
    }

    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    )
        public
        virtual
        override
        ensure(deadline)
        returns (uint amountA, uint amountB)
    {
        address pair = NordekV2Library.pairFor(factory, tokenA, tokenB);
        INordekV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = INordekV2Pair(pair).burn(to);
        (address token0, ) = NordekV2Library.sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0
            ? (amount0, amount1)
            : (amount1, amount0);
        require(amountA >= amountAMin, "NordekV2Router: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "NordekV2Router: INSUFFICIENT_B_AMOUNT");
    }

    function removeLiquidityNRK(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountNRKMin,
        address to,
        uint deadline
    )
        public
        virtual
        override
        ensure(deadline)
        returns (uint amountToken, uint amountNRK)
    {
        (amountToken, amountNRK) = removeLiquidity(
            token,
            WNRK,
            liquidity,
            amountTokenMin,
            amountNRKMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWNRK(WNRK).withdraw(amountNRK);
        TransferHelper.safeTransferNRK(to, amountNRK);
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = NordekV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? type(uint256).max : liquidity;
        INordekV2Pair(pair).permit(
            msg.sender,
            address(this),
            value,
            deadline,
            v,
            r,
            s
        );
        (amountA, amountB) = removeLiquidity(
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline
        );
    }

    function removeLiquidityNRKWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountNRKMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountToken, uint amountNRK) {
        address pair = NordekV2Library.pairFor(factory, token, WNRK);
        uint value = approveMax ? type(uint256).max : liquidity;
        INordekV2Pair(pair).permit(
            msg.sender,
            address(this),
            value,
            deadline,
            v,
            r,
            s
        );
        (amountToken, amountNRK) = removeLiquidityNRK(
            token,
            liquidity,
            amountTokenMin,
            amountNRKMin,
            to,
            deadline
        );
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityNRKSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountNRKMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountNRK) {
        (, amountNRK) = removeLiquidity(
            token,
            WNRK,
            liquidity,
            amountTokenMin,
            amountNRKMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(
            token,
            to,
            IERC20(token).balanceOf(address(this))
        );
        IWNRK(WNRK).withdraw(amountNRK);
        TransferHelper.safeTransferNRK(to, amountNRK);
    }

    function removeLiquidityNRKWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountNRKMin,
        address to,
        uint deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint amountNRK) {
        address pair = NordekV2Library.pairFor(factory, token, WNRK);
        uint value = approveMax ? type(uint256).max : liquidity;
        INordekV2Pair(pair).permit(
            msg.sender,
            address(this),
            value,
            deadline,
            v,
            r,
            s
        );
        amountNRK = removeLiquidityNRKSupportingFeeOnTransferTokens(
            token,
            liquidity,
            amountTokenMin,
            amountNRKMin,
            to,
            deadline
        );
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(
        uint[] memory amounts,
        address[] memory path,
        address _to
    ) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = NordekV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOut)
                : (amountOut, uint(0));
            address to = i < path.length - 2
                ? NordekV2Library.pairFor(factory, output, path[i + 2])
                : _to;
            INordekV2Pair(NordekV2Library.pairFor(factory, input, output)).swap(
                    amount0Out,
                    amount1Out,
                    to,
                    new bytes(0)
                );
        }
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        amounts = NordekV2Library.getAmountsOut(factory, amountIn, path);
        require(
            amounts[amounts.length - 1] >= amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        amounts = NordekV2Library.getAmountsIn(factory, amountOut, path);
        require(
            amounts[0] <= amountInMax,
            "NordekV2Router: EXCESSIVE_INPUT_AMOUNT"
        );
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, to);
    }

    function swapExactNRKForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WNRK, "NordekV2Router: INVALID_PATH");
        amounts = NordekV2Library.getAmountsOut(factory, msg.value, path);
        require(
            amounts[amounts.length - 1] >= amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
        IWNRK(WNRK).deposit{value: amounts[0]}();
        assert(
            IWNRK(WNRK).transfer(
                NordekV2Library.pairFor(factory, path[0], path[1]),
                amounts[0]
            )
        );
        _swap(amounts, path, to);
    }

    function swapTokensForExactNRK(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WNRK, "NordekV2Router: INVALID_PATH");
        amounts = NordekV2Library.getAmountsIn(factory, amountOut, path);
        require(
            amounts[0] <= amountInMax,
            "NordekV2Router: EXCESSIVE_INPUT_AMOUNT"
        );
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, address(this));
        IWNRK(WNRK).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferNRK(to, amounts[amounts.length - 1]);
    }

    function swapExactTokensForNRK(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WNRK, "NordekV2Router: INVALID_PATH");
        amounts = NordekV2Library.getAmountsOut(factory, amountIn, path);
        require(
            amounts[amounts.length - 1] >= amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amounts[0]
        );
        _swap(amounts, path, address(this));
        IWNRK(WNRK).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferNRK(to, amounts[amounts.length - 1]);
    }

    function swapNRKForExactTokens(
        uint amountOut,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        payable
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WNRK, "NordekV2Router: INVALID_PATH");
        amounts = NordekV2Library.getAmountsIn(factory, amountOut, path);
        require(
            amounts[0] <= msg.value,
            "NordekV2Router: EXCESSIVE_INPUT_AMOUNT"
        );
        IWNRK(WNRK).deposit{value: amounts[0]}();
        assert(
            IWNRK(WNRK).transfer(
                NordekV2Library.pairFor(factory, path[0], path[1]),
                amounts[0]
            )
        );
        _swap(amounts, path, to);
        // refund dust NRK, if any
        if (msg.value > amounts[0])
            TransferHelper.safeTransferNRK(msg.sender, msg.value - amounts[0]);
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(
        address[] memory path,
        address _to
    ) internal virtual {
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = NordekV2Library.sortTokens(input, output);
            INordekV2Pair pair = INordekV2Pair(
                NordekV2Library.pairFor(factory, input, output)
            );
            uint amountInput;
            uint amountOutput;
            {
                // scope to avoid stack too deep errors
                (uint reserve0, uint reserve1, ) = pair.getReserves();
                (uint reserveInput, uint reserveOutput) = input == token0
                    ? (reserve0, reserve1)
                    : (reserve1, reserve0);
                amountInput = IERC20(input).balanceOf(address(pair)).sub(
                    reserveInput
                );
                amountOutput = NordekV2Library.getAmountOut(
                    amountInput,
                    reserveInput,
                    reserveOutput
                );
            }
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOutput)
                : (amountOutput, uint(0));
            address to = i < path.length - 2
                ? NordekV2Library.pairFor(factory, output, path[i + 2])
                : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >=
                amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
    }

    function swapExactNRKForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable virtual override ensure(deadline) {
        require(path[0] == WNRK, "NordekV2Router: INVALID_PATH");
        uint amountIn = msg.value;
        IWNRK(WNRK).deposit{value: amountIn}();
        assert(
            IWNRK(WNRK).transfer(
                NordekV2Library.pairFor(factory, path[0], path[1]),
                amountIn
            )
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >=
                amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
    }

    function swapExactTokensForNRKSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        require(path[path.length - 1] == WNRK, "NordekV2Router: INVALID_PATH");
        TransferHelper.safeTransferFrom(
            path[0],
            msg.sender,
            NordekV2Library.pairFor(factory, path[0], path[1]),
            amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WNRK).balanceOf(address(this));
        require(
            amountOut >= amountOutMin,
            "NordekV2Router: INSUFFICIENT_OUTPUT_AMOUNT"
        );
        IWNRK(WNRK).withdraw(amountOut);
        TransferHelper.safeTransferNRK(to, amountOut);
    }

    // **** LIBRARY FUNCTIONS ****
    function quote(
        uint amountA,
        uint reserveA,
        uint reserveB
    ) public pure virtual override returns (uint amountB) {
        return NordekV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) public pure virtual override returns (uint amountOut) {
        return NordekV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(
        uint amountOut,
        uint reserveIn,
        uint reserveOut
    ) public pure virtual override returns (uint amountIn) {
        return NordekV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(
        uint amountIn,
        address[] memory path
    ) public view virtual override returns (uint[] memory amounts) {
        return NordekV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(
        uint amountOut,
        address[] memory path
    ) public view virtual override returns (uint[] memory amounts) {
        return NordekV2Library.getAmountsIn(factory, amountOut, path);
    }
}
