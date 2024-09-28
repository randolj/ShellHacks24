import React from "react";
import "./Budgeting.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
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

function Budgeting() {
  const [open, setOpen] = React.useState(false);
  const [Language, setLanguage] = React.useState("");
  const [Currency, setCurrency] = React.useState("");

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
        <img className="logo" src={logo} alt=""/>
      </div>
  
      <div className="BudgetContainer">
        <div className="BudgetCard">
          <div className="BudgetContent">
            <div className="BudgetHeader">
              <p style={{ fontWeight: "500" }}>Good Afternoon Juan,</p>
              <p>September summary</p>
            </div>
            <div className="BudgetGauge">
              <Gauge
                className="test"
                width={250}
                height={170}
                value={690.46}
                valueMax={1000}
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
                  [`& .${gaugeClasses.referenceArc}`]: {

                  },
                }}
                text={({ value, valueMax }) => `$${value}/${valueMax}`}
              />
            </div>
            <div className="ButtonSection">
              <div className="BudgetButton">
                <div>Manage Budget</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budgeting;
