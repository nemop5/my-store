import "./api-error-message.scss";
import { useNavigate } from "react-router-dom";

export function ApiErrorMessage({ errorMessage }) {
  const navigate = useNavigate();
  const handleForwarding = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  return (
    <>
      {errorMessage && <div className="error-message">{errorMessage.message}</div>}
      {errorMessage.error?.inventory && (
        <p>
          Link do inventara
          <span className="item-link" onClick={() => handleForwarding(errorMessage.error.inventory.itemId)}>
            {errorMessage.error.inventory.itemId}
          </span>
        </p>
      )}
    </>
  );
}
