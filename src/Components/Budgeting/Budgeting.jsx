import React from "react";
import "./Budgeting.css";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TranslateIcon from "@mui/icons-material/Translate";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import logo from "../Capital_One_logo.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Budgeting() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [manageBudgetOpen, setManageBudgetOpen] = useState(false);

  const [Language, setLanguage] = React.useState("");
  const [Currency, setCurrency] = React.useState("");

  const [userName, setUserName] = useState("");
  const [budget, setBudget] = useState("");
  const [newBudget, setNewBudget] = useState(""); // Step 1: State to track new budget input

  const handleChangeCurrency = (event) => {
  setCurrency(event.target.value);
};

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("userToken");

    // If token exists, fetch the latest budget from the backend
    if (token) {
      axios
        .get("http://localhost:8004/api/auth/user-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.name);
          setBudget(response.data.budget);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          if (error.response && error.response.status === 401) {
            alert("Session expired or invalid token. Please log in again.");
            navigate("/login");
          }
        });
    } else if (location.state) {
      // If no token, but location state exists, use it (e.g., user just logged in)
      setUserName(location.state.name);
      setBudget(location.state.budget);
    } else {
      // If no state and no token, redirect to login
      navigate("/login");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Check if state exists and if yes, update the budgetValue and expenses
    if (location.state) {
      setUserName(location.state.name);
      setBudget(location.state.budget);
    }
  }, [location.state]);

  const handleChange = (event) => {
    setLanguage(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleManageBudgetOpen = () => {
    setManageBudgetOpen(true);
  };

  const handleManageBudgetClose = () => {
    setManageBudgetOpen(false);
  };

  const handleManageBudgetSubmit = () => {
    setManageBudgetOpen(false);
    const token = localStorage.getItem("userToken");

    axios
      .post(
        "http://localhost:8004/api/auth/update-budget",
        {
          budget: parseInt(newBudget),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly setting the authorization header
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        setBudget(newBudget); // Update state only on successful API response
      })
      .catch((error) => {
        console.error("Failed to update budget:", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired or invalid token. Please log in again.");
          navigate("/login");
        }
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");

    // Optionally, clear other user data or reset state as needed
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      <div className="headerBanner">
        <Button
          className="transButton"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickOpen}
        >
          <div className="translateButton">
            <TranslateIcon />
          </div>
        </Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Language</InputLabel>
                <Select
                  native
                  value={Language}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label="language" id="demo-dialog-native" />
                  }
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={Currency}
                  onChange={handleChange}
                  input={<OutlinedInput label="Currency" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
        <img className="logo" src={logo} alt="" />
        <div className="logoutButton" onClick={handleLogout}>
          <LogoutIcon />
        </div>
      </div>
      <div className="BudgetContainer">
        <div className="BudgetCard">
          <div className="BudgetContent">
            <div className="BudgetHeader">
              <p style={{ fontWeight: "500" }}>Good Afternoon {userName},</p>
              <p>September summary</p>
            </div>
            <div className="BudgetGauge">
              <Gauge
                className="test"
                width={250}
                height={170}
                value={0}
                valueMax={budget}
                startAngle={-110}
                endAngle={110}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 23,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    transform: "translate(0px, -14px)",
                  },
                  [`& .${gaugeClasses.valueText} text`]: {
                    fill: "#ffffff",
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#d03027",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {},
                }}
                text={({ value, valueMax }) =>
                  valueMax === 0 ? `$${value}/$X.XX` : `$${value}/$${valueMax}`
                }
              />
            </div>
            <div className="ButtonSection">
              <div className="BudgetButton" onClick={handleManageBudgetOpen}>
                Manage Budget
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={manageBudgetOpen}
          onClose={handleManageBudgetClose}
          PaperProps={{
            sx: {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <DialogTitle>
            Manage Budget
            <IconButton
              aria-label="close"
              onClick={handleManageBudgetClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="budgetInput">
              <input
                id="budget"
                placeholder="New Budget"
                name="budget"
                className="budgetIn"
                value={newBudget ? `$${newBudget}` : ""}
                onChange={(e) => {
                  const valueWithoutDollar = e.target.value.replace(/^\$/, "");
                  setNewBudget(valueWithoutDollar);
                }}
              />
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
                type="submit"
                onClick={handleManageBudgetSubmit}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Budgeting;
