import React from "react";
import "./OptionsBox.scss";
import successLogo from "../../assets/icons/success/outline.svg";

const OptionsBox = ({ label, onClick, optionBg }) => {
  const backgroundColor = optionBg ? "#84cbbc" : "white";
  const textColor = optionBg ? "white" : "#84cbbc";

  return (
    <div className="options">
      <button
        onClick={onClick}
        style={{ backgroundColor, color: textColor, fontSize: 16 }}
      >
        <span>{label}</span>
        {optionBg && <img src={successLogo} alt="success-logo" />}
      </button>
    </div>
  );
};

export default OptionsBox;
