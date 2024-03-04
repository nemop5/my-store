import "./item-display-value.scss";

export const ItemDisplayValue = ({ label, value }) => {
  return (
    <div className="item-display-value__wrap">
      <label className="item-display-value__label">{label}</label>
      <div className="item-display-value">{value}</div>
    </div>
  );
};
