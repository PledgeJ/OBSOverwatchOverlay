/* eslint-disable prettier/prettier */
import { TextField } from "@mui/material";
import React from "react";

export interface InputProps {
  id?: string;
  label: string;
  value: unknown;
  onChange: (value: string) => void;
  maxLength?: number;
}

export const UserInput: React.FC<InputProps> = ({
  id = 'outlined-basic',
  label,
  value,
  onChange,
  maxLength = 30
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
      id={id}
      label={label}
      variant="outlined"
      sx={{
        "& .MuiInputBase-input": { color: "white" },
        "& .MuiInputLabel-root": { color: "white" },
        "& .MuiInputLabel-root.Mui-focused": { color: "white" },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
      }}
      value={value}
      onChange={handleChange}
    />
  )
}