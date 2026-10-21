/* eslint-disable prettier/prettier */
import { TextField } from "@mui/material";
import React from "react";

export interface InputProps {
  id?: string;
  label: string;
  value: unknown;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  width?: number
}

export const UserInput: React.FC<InputProps> = ({
  id = 'outlined-basic',
  label,
  value,
  onChange,
  maxLength = 30,
  disabled = false,
  width = 223,
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newVal:string = event.target.value;

    if (maxLength && newVal.length > maxLength) {
      return;
    }

    onChange(newVal);
  };

  return (
    <TextField 
      disabled={disabled}
      id={id}
      label={label}
      variant="outlined"
      sx={{
        width: width,
        "& .MuiInputBase-input": { color: "#e0e0e0" },
        "& .MuiInputLabel-root": { color: "#e0e0e0" },
        "& .MuiInputLabel-root.Mui-focused": { color: "#e0e0e0" },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e0e0e0",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e0e0e0",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e0e0e0",
        },
      }}
      value={value}
      onChange={handleChange}
    />
  )
}