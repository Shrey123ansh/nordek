import React, { useState } from "react";
import { ToggleSwitchProps } from "./ToggleSwitchProps";

const ExpertToggle: React.FC<ToggleSwitchProps> = ({ expertToggle, setExpertToggle }) => {
  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between">
        <input
          className="toggle toggle-md"
          type="checkbox"
          id="expertToggle"
          checked={expertToggle}
          onChange={() => setExpertToggle(!expertToggle)}
        />
        <label htmlFor="expertToggle" className="ml-2">
          Expert Mode
        </label>
      </div>
    </div>
  );
};

export default ExpertToggle;
