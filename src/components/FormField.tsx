import React from "react";

type Props = {
  id: string;
  label: string;
  children: React.ReactNode;
};

function FormField({ id, label, children }: Props) {
  return (
    <div className="resource-form-field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export default FormField;
