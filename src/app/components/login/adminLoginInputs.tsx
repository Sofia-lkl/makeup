import React from "react";

interface AdminLoginInputsProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const AdminLoginInputs: React.FC<AdminLoginInputsProps> = ({
  username,
  password,
  setUsername,
  setPassword,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default AdminLoginInputs;
