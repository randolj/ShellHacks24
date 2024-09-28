import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import logo from "./Capital_One_logo.png";
import "./Login.css";

function Login() {
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
        <TextField id="outlined-password" label="Password" variant="outlined" />
      </Box>

      {/* Sign In button positioned right below */}
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
        Sign In
      </Button>
    </div>
  );
}

export default Login;
