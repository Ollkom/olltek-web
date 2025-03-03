const Input = ({ value, label, name, placeholder, type, onChange, onBlur }) => (
  <div>
    {label && (
      <label
        htmlFor="input-field"
        className="block tracking-wide text-black text-base mb-2"
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      className={`bg-lightGrayBackground appearance-none block w-full text-gray-700 rounded px-4 py-3 leading-tight focus:outline-[#0D6EFD] focus:bg-white border border-[#E5E5E7] placeholder:text-lightGrayText placeholder:text-sm`}
    />
  </div>
);

export default Input;
