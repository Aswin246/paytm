export const InputBox = ({ title, placeholder, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 p-2 border rounded-md w-full"
      />
    </div>
  );
};
