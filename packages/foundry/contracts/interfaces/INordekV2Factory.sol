pragma solidity ^0.8.20;

interface INordekV2Factory {
    function feeTo() external view returns (address);

    function feeToSetter() external view returns (address);

    function getPair(
        address tokenA,
        address tokenB
    ) external view returns (address pair);

    function allPairs(uint) external view returns (address pair);

    function allPairsLength() external view returns (uint);

    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair);

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;

        function setDevFee(address pair, uint8 _devFee) external;

    function setPercent(
        address _pair,
        uint256 _ndev,
        uint256 _ddev
    ) external;
}
