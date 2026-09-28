// Common form field component used for simple form layouts.
function FormInput({ label, type = 'text', name, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
