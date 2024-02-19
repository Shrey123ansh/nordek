import React from "react";

interface ActionButtonProps {
  text: string;
  onClick: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, onClick, setLoading, loading }) => {
  return (
    <button
      className="btn btn-sm btn-outline btn-accent my-4"
      onClick={onClick}
      disabled={loading === true ? true : false}
    >
      {text}
    </button>
  );
};

export default ActionButton;
