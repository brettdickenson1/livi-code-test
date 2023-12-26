import React from "react";
import "./MainBtn.scss";

const MainBtn = ({ onClick, btnTitle, disableBtn, bookingBtn }) => {
  return (
    <div
      className="nextBtn"
      style={!bookingBtn ? { bottom: 0 } : { top: "auto" }}
    >
      <button
        style={
          disableBtn
            ? { background: "#EDEFF1", color: "#829AA8" }
            : { background: "#84cbbc", color: "white" }
        }
        disabled={disableBtn}
        onClick={onClick}
      >
        {btnTitle}
      </button>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="chevron/right">
          <path
            id="Vector"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.29317 2.29262C7.68384 1.90225 8.317 1.90249 8.70738 2.29317L17.7074 11.3001C18.0975 11.6905 18.0975 12.3233 17.7074 12.7138L8.72121 21.7068C8.33084 22.0975 7.69767 22.0978 7.307 21.7074C6.91632 21.317 6.91608 20.6838 7.30645 20.2932L15.5863 12.0069L7.29262 3.70683C6.90225 3.31616 6.90249 2.683 7.29317 2.29262Z"
            fill={disableBtn ? "#829AA8" : "white"}
          />
        </g>
      </svg>
    </div>
  );
};

export default MainBtn;
