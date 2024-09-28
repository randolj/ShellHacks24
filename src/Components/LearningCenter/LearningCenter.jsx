import React from "react";
import "./LearningCenter.css";

const LearningCenter = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="title">Learning Center</div>
        <div className="card card-1">
          <div className="card-content">Understanding Budgeting</div>
        </div>
        <div className="card card-2">
          <div className="card-content">Banking & Savings</div>
        </div>
        <div className="card card-3">
          <div className="card-content">Credit Management</div>
        </div>
        <div className="card card-4">
          <div className="card-content">Debt Management</div>
        </div>
        <div className="card card-5">
          <div className="card-content">Financial Assistance</div>
        </div>
        <div className="card card-6">
          <div className="card-content">Small Business</div>
        </div>
        <div className="card card-7">
          <div className="card-content">Financial Rights & Advocacy</div>
        </div>
        <div className="card card-8">
          <div className="card-content">Community</div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
