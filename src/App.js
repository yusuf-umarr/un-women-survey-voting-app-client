import "./App.css";
import React, { useState, useEffect, useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WorkBook from "./screen/workBook/workBokk";
import PlenaryValues from "./screen/plenaryValues/plenaryValues";
import PlentyValueGraph from "./screen/plenaryValues/plentyValueGraph";
import PollScreen from "./screen/pollScreen/pollScreen";
import FacilitatorResponse from "./screen/facilitatorResponse/facilitatorResponse";
import FacilitatorBarChart from "./screen/facilitatorBarChart/facilitatorBarChart";
import FacilitatorPoll from "./screen/facilitatorPoll/facilitatorPoll";
import FacilitatorPollResult from "./screen/facilitatorPollResult/facilitatorPollResult";
import ExerciseScreen from "./screen/exerciseScreen/exerciseScreen";
import ParticipantContext from "./provider/participantProvider";
import ExerciseCResponse from "./screen/exerciseCResponse/exerciseCResponse";
import FacilitatorExerRes from "./screen/facilitatorExerRes/facilitatorExerRes";

function App() {
  const { responseState, RESPONSE } = useContext(ParticipantContext);

  useEffect(() => {
    RESPONSE.recoverAllResponse();
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WorkBook />} />
          <Route path="/plenary-values" element={<PlenaryValues />} />
          <Route path="/poll-screen" element={<PollScreen />} />
          <Route path="/exercise-screen" element={<ExerciseScreen />} />
          <Route path="/exercise-response" element={<ExerciseCResponse />} />
          <Route path="/facilitator" element={<FacilitatorResponse />} />
          <Route
            path="/facilitator-bar-chart"
            element={<FacilitatorBarChart />}
          />
          <Route path="/facilitator-poll" element={<FacilitatorPoll />} />
          <Route
            path="/facilitator-poll-result"
            element={<FacilitatorPollResult />}
          />
          <Route
            path="/facilitator-exercise-response"
            element={<FacilitatorExerRes />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
