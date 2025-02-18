import React, { useState } from "react";
import Input from "../atoms/TextInput";
import Label from "../atoms/PrimaryButton";
import Button from "../atoms/PrimaryButton";

const FormInput = () => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    alert(`Hello, ${name}!`);
  };

  return (
    <div className="p-4 border border-gray-200 rounded">
      <Label text="Nama" htmlFor="name" />
      <Input
        type="text"
        placeholder="Masukkan nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button text="Kirim" onClick={handleSubmit} />
    </div>
  );
};

export default FormInput;
