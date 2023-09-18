import React from "react";
const Button = ({ text, color, onClick }) => {
  return (
    <button  onClick={onClick}  className={`btn mx-3 mt-2 btn-${color}`}>
      {text}
    </button>
  );
};
export default Button;
