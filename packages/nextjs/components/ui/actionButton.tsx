import React from "react";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick }) => {
  return (
    <button className="btn btn-sm btn-outline btn-accent my-2" onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
