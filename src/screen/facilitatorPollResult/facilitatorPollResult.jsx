import React from "react";
import FacilitatorNav from "../../component/navTab/facilitatorNav";
import TopBar from "../../component/topBar/topBar";
import FacilitatorPollGraph from "./facilitator-poll-graph";
import "./style.css";

const FacilitatorPollResult = () => {
  return (
    <div className="facilitator-poll-result-container">
      <div className="facilitator-poll-result">
        <TopBar />
        <div className="facilitator-poll-result-top">
          <FacilitatorNav pollBg="#0f74be" pollColor="#fff" />
        </div>
        <span>These are the results from the poll</span>
        <div className="facilitaor-result-graph">
          <FacilitatorPollGraph />
        </div>
      </div>
    </div>
  );
};

export default FacilitatorPollResult;
