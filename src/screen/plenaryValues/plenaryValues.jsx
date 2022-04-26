import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Bar } from "react-chartjs-2";
import PlentyValueGraph from "./plentyValueGraph";
import { Link } from "react-router-dom";
import TopBar from "../../component/topBar/topBar";
import NavTab from "../../component/navTab/navTab";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
const PlenaryValues = () => {
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const [isPoll, setIsPoll] = useState(false);
  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        setIsPoll(res.data.enablePoll);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getResponses();
  }, [isPoll]);
  return (
    <div className="plenary-value-container">
      <div className="plenary-values">
        <TopBar />
        <div className="plenary-value-bottom">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvBgColor="#0f74be"
            pvTextColor="#fff"
          />
          <span>
            The bar chart below represents the most issued response regarding
            Exercise A
          </span>
          <div className="plenary-bar-chat-container">
            <div className="plenary-bar-chat">
              <PlentyValueGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlenaryValues;
