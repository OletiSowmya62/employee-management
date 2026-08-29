import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.js";

function Loader() {
  const { theme } = useContext(ThemeContext);
  const spinnerColor = theme === "dark" ? "text-info" : "text-primary";

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh" }}
    >
      <div className={`spinner-border ${spinnerColor}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;