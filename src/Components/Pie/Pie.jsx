import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./Pie.css";

function Pie() {
  return (
    <div className="PieContainer">
      <p className="PieHeading">
        How's your spending?
      </p>
      <div className="PieContent">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 120, label: "Groceries", color: "#E3B505" },
                { id: 1, value: 76, label: "Entertainment", color: "#D03027" },
                {
                  id: 2,
                  value: 340,
                  label: "Bills & Ultities",
                  color: "#004977",
                },
                { id: 3, value: 40, label: "Subscription", color: "#C879FF" },
                { id: 3, value: 20, label: "Gas", color: "#44BBA4" },
              ],
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={400}
          height={200}
        />
        <p className="PieTitle">Spending Breakdown</p>
      </div>
    </div>
  );
}

export default Pie;
