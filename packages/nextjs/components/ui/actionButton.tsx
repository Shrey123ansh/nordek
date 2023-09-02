import React from "react";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButton> = ({ text, onClick }) => {
  return (
    <button className="py-1 px-4 border rounded-full" onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
