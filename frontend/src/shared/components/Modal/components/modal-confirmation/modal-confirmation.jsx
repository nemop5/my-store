import { Button } from "shared";
import "./modal-confirmation.scss";

export const ModalConfirmation = ({
  onSubmit,
  onCancel,
  isBtnLoading,
  title,
  text,
  btnColor = "red",
  btnSubmitText = "Zatvori",
}) => {
  return (
    <>
      {title && (
        <div className="modal-confirmation">
          <h2 className="modal-confirmation__title">{title}</h2>
        </div>
      )}

      {text && <div className="modal-confirmation__text">{text}</div>}

      <div className="modal-confirmation__controls">
        <Button
          buttonText={btnSubmitText}
          buttonColor={btnColor}
          event={onSubmit}
          spinnerColor={"light"}
          isLoading={isBtnLoading}
        />
        <Button buttonText={"Otkaži"} buttonColor={"gray"} event={onCancel} />
      </div>
    </>
  );
};
