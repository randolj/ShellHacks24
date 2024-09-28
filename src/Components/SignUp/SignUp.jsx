import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "../Capital_One_logo.png";
import {useNavigate} from "react-router-dom"
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="body">
      <img src={logo} alt="Capital One Logo" className="logo" />
      {/* Centered form container with the text fields */}
      <Box
        className="form-box"
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "40ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-username" label="Username" variant="outlined" />
        <TextField id="outlined-password" label="Password" variant="outlined" type="password" />
        <TextField id="outlined-password" label="Repeat Password" variant="outlined" type="password" />
      </Box>
      <div className="redirect" onClick={() => navigate("/login")}>
          <span>{"Already have an account?"}</span>
      </div>
      <Button
        className="center-button"
        sx={{
          backgroundColor: "rgb(71,140,209)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgb(0,72,120)",
          },
        }}
        variant="contained"
      >
        Sign Up
      </Button>
    </div>
  );
}

export default SignUp;
