import "./Button.css";

const Button = ({ isLarge, onClick, isDisabled, type, children }) => {
  return (
    <button
      className={isLarge ? "largeBtn" : "smallBtn"}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
