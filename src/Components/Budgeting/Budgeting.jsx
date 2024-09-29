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

function Budgeting() {
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [manageBudgetOpen, setManageBudgetOpen] = useState(false);

  const [Language, setLanguage] = React.useState("");
  const [Currency, setCurrency] = React.useState("");

  const [userName, setUserName] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    // Check if state exists and if yes, update the budgetValue and expenses
    if (location.state) {
      setUserName(location.state.name);
      setBudget(location.state.budget);
    }
    console.log(budget);
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
        {/* Manage Budget Modal */}
        <Dialog open={manageBudgetOpen} onClose={handleManageBudgetClose}>
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
            <p>Here you can manage your budget details.</p>
            {/* Add more budget management content here */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Budgeting;
