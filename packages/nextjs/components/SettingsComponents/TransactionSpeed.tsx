import React, { useState } from "react";

const TransactionSpeed = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

  return (
    <div className="space-y-4">
      {/* Element 1 */}
      <div className="flex items-center justify-between">
        <label htmlFor="toggle1">Tx Deadline (Mins)</label>
        <input
          className="toggle toggle-md"
          type="checkbox"
          id="toggle1"
          checked={toggle1}
          onChange={() => setToggle1(!toggle1)}
        />
      </div>

      {/* Element 2 */}
      <div className="flex items-center justify-between">
        <label htmlFor="toggle2">Expert Mode</label>
        <input
          className="toggle toggle-md"
          type="checkbox"
          id="toggle2"
          checked={toggle2}
          onChange={() => setToggle2(!toggle2)}
        />
      </div>

      {/* Element 3 */}
      <div className="flex items-center justify-between">
        <label htmlFor="toggle3">Disable Multihops</label>
        <input
          className="toggle toggle-md"
          type="checkbox"
          id="toggle3"
          checked={toggle3}
          onChange={() => setToggle3(!toggle3)}
        />
      </div>

      {/* Element 4 */}
      <div className="flex items-center justify-between">
        <label htmlFor="toggle4">Flappy Sounds</label>
        <input
          className="toggle toggle-md"
          type="checkbox"
          id="toggle4"
          checked={toggle4}
          onChange={() => setToggle4(!toggle4)}
        />
      </div>
    </div>
  );
};

export default TransactionSpeed;
