import React from "react";

interface inputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  type: string;
}

const Input: React.FC<inputProps> = ({ value, onChange, name, id, type }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      name={name}
      id={id}
      className="mt-1 w-full h-9 p-2  border border-slate-300 rounded-md
          focus:outline-none focus:border-primary transition-all duration-300 ease-in-out"
    />
  );
};

export default Input;
