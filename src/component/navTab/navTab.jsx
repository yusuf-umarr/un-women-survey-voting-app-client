import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
const NavTab = ({
  wkBgColor,
  wkTextColor,
  pvBgColor,
  pvTextColor,
  poBgColor,
  poTextColor,
  exBgColor,
  exRBgColor,
  exTextColor,
  exRTextColor,
}) => {
  const [isEnablePoll, setIsEnablePoll] = useState(false);
  const { responseState, RESPONSE } = useContext(ParticipantContext);

  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        RESPONSE.savePollStatus(res.data.endPoll);
        setIsEnablePoll(res.data.enablePoll);
        // console.log({ isEnablePoll: isEnablePoll });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResponses();
  }, [isEnablePoll]);
  return (
    <>
      <div className="nav-tab-container">
        <Link
          to="/"
          className="nav-tab-text"
          style={{ backgroundColor: wkBgColor }}
        >
          <span style={{ color: wkTextColor }}>EXERCISE A</span>
        </Link>

        <Link
          to="/plenary-values"
          className="nav-tab-text-off"
          style={{ backgroundColor: pvBgColor }}
        >
          <span style={{ color: pvTextColor }}>PLENARY VALUE</span>
        </Link>

        <Link
          to="/poll-screen"
          className="nav-tab-text-off"
          style={{ backgroundColor: poBgColor }}
        >
          <span style={{ color: poTextColor }}>POLL</span>
        </Link>

        <Link
          to="/exercise-screen"
          className="nav-tab-text-off"
          style={{ backgroundColor: exBgColor }}
        >
          <span style={{ color: exTextColor }}>EXERCISE C</span>
        </Link>
        <Link
          to="/exercise-response"
          className="nav-tab-text-off"
          style={{ backgroundColor: exRBgColor }}
        >
          <span style={{ color: exRTextColor }}>EXERCISE C RESPONSE</span>
        </Link>
      </div>
    </>
  );
};

export default NavTab;
