import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Toast Component
 * Displays a toast message with a dismiss button.
 *
 * @param {Object} props - Props for the component.
 * @param {string} props.type - The type of toast message.
 * @param {string} props.message - The message to display in the toast.
 * @param {Function} props.dismissError - The function to dismiss the toast message.
 */
const Toast = ({ type, message, dismissError }) => {
  const typeToClassMap = {
    error: "bg-red-100 border-l-4 border-red-500 text-red-700",
    success: "bg-green-100 border-l-4 border-green-500 text-green-700 my-2",
    warning: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
  };
  return (
    <div
      className={`${typeToClassMap[type]} p-4 mb-4 flex justify-between`}
      style={{
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "center",
        backgroundColor:
          type === "error"
            ? "#FEE2E2"
            : type === "success"
            ? "#D1FAE5"
            : type === "warning"
            ? "#FEF3C7"
            : "inherit",
        borderLeft:
          type === "error"
            ? "4px solid #F87171"
            : type === "success"
            ? "4px solid #34D399"
            : type === "warning"
            ? "4px solid #FBBF24"
            : "none",
        color:
          type === "error"
            ? "#EF4444"
            : type === "success"
            ? "#22C55E"
            : type === "warning"
            ? "#F59E0B"
            : "inherit",
      }}
      data-testid="toast__outlet"
    >
      <p data-testid="toast__message">{message}</p>
      <FontAwesomeIcon
        onClick={() => dismissError()}
        className="text-red-500 hover:text-red-700 ml-2"
        style={{
          color: "rgba(239,68,68,1)",
          marginLeft: "0.5rem",
          ":hover": { color: "#e53e3e" },
        }}
        icon={faXmark}
        size="lg"
        data-testid="toast__dismiss"
      />
    </div>
  );
};

export default Toast;
