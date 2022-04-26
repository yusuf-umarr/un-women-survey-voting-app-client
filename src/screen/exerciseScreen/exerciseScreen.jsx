import React, { useEffect, useState, useContext } from "react";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import NavTab from "../../component/navTab/navTab";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ParticipantContext from "../../provider/participantProvider";

const ExerciseScreen = () => {
  const [updatedRes, setUpdatedRes] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [exerciseResData, setExerciseResData] = useState([]);
  const [exerciseRes, setExerciseRes] = useState("");
  const [exerciseCFirstA, setExerciseCFirstA] = useState("");
  const [exerciseCFirstB, setExerciseCFirstB] = useState("");
  const [exerciseCSecondA, setExerciseCSecondA] = useState("");
  const [exerciseCSecondB, setExerciseCSecondB] = useState("");
  const [success, setSuccess] = React.useState("");
  const [isloading, setIsloading] = useState(true);
  const [enablePoll, setEnablePoll] = useState(false);
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const [shortedRes, setSortedRes] = useState([]);
  const [endPoll, setEndPoll] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post("/api/exercise/", {
          exerciseCFirstA,
          exerciseCFirstB,
          exerciseCSecondA,
          exerciseCSecondB,
        })
        .then((res) => {
          setExerciseResData(res.data.topTwoVote);
          setSuccess("Response Sent!");
          setTimeout(() => {
            setSuccess("");
            window.location.reload();
          }, 3000);
          // console.log({ exerciseResData: exerciseResData });
        });
    } catch (error) {
      console.log(error);
    }
  }

  var topres = [];
  useEffect(() => {
    showTopRes();

    if (localStorage.getItem("sorted-response")) {
      setUpdatedRes(JSON.parse(localStorage.getItem("sorted-response")));
    }
  }, [updatedRes]);

  function showTopRes() {
    topres = shortedRes.slice(0, 2);
    setGetSortedRes(topres);
  }

  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        setEnablePoll(res.data.enablePoll);
        setEndPoll(res.data.endPoll);
        setSortedRes(res.data.sortedResponse);

        // console.log({ shortedRes: shortedRes });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResponses();
  }, [enablePoll]);
  return (
    <form className="survey-screen-container" onSubmit={handleSubmit}>
      <div className="survey-screen">
        <TopBar />
        <div className="survey-top">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvTextColor="#0f74be"
            poTextColor="#0f74be"
            exBgColor="#0f74be"
            exTextColor="#fff"
          />
        </div>
        {endPoll ? (
          <div className="exercise-screen-text-container">
            <h4>Exercise B(POLL) :</h4>
            <h5>These are the most voted reponses from the polling unit</h5>
            <div className="most-voted-response-text">
              {getSortedRes.map((res, i) => {
                return <span>{res}</span>;
              })}
            </div>

            <div className="survey-exercise-table">
              <div className="survey-exercise-table-text"></div>
            </div>
            <div className="survey-exercise-c1">
              <h4>Exercise C :</h4>
              <span>For each value answer the following</span>
            </div>
            <h3 style={{ color: "green" }}>{success && success}</h3>
            <div className="survey-exercise-table">
              <div className="survey-exercise-table-text">
                <div className="table">
                  <tr>
                    <th className="th">
                      <div className="thDiv">
                        <span className="tdDiv-text">{getSortedRes[0]}</span>
                      </div>
                    </th>
                    <th className="th">
                      <div className="thDiv">
                        <span>Value</span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        In our work place what action is needed to live this
                        value?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        style={{ height: 70 }}
                        type="text"
                        onChange={(e) => setExerciseCFirstA(e.target.value)}
                        name="exerciseCFirstA"
                        value={exerciseCFirstA}
                        maxLength="50"
                        required
                        placeholder="Give your response in short sentences"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        How will we hold ourselves accountable?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        placeholder="Give your response in short sentences"
                        style={{ height: 70 }}
                        type="text"
                        onChange={(e) => setExerciseCFirstB(e.target.value)}
                        name="exerciseCFirstB"
                        value={exerciseCFirstB}
                        maxLength="50"
                        required
                      />
                    </td>
                  </tr>

                  <tr>
                    <th className="th">
                      <div className="thDiv">
                        <span className="tdDiv-text">{getSortedRes[1]}</span>
                      </div>
                    </th>
                    <th className="th">
                      <div className="thDiv">
                        <span>Value</span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        {" "}
                        In our work place what action is needed to live this
                        value?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        type="text"
                        onChange={(e) => setExerciseCSecondA(e.target.value)}
                        name="exerciseCSecondA"
                        value={exerciseCSecondA}
                        maxLength="50"
                        required
                        style={{ height: 70 }}
                        placeholder="Give your response in short sentences"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="tdC2">
                      <div className="tdDiv2">
                        How will we hold ourselves accountable?
                      </div>
                    </td>
                    <td className="td">
                      <input
                        type="text"
                        onChange={(e) => setExerciseCSecondB(e.target.value)}
                        name="exerciseCSecondB"
                        value={exerciseCSecondB}
                        maxLength="50"
                        required
                        style={{ height: 70 }}
                        placeholder="Give your response in short sentences"
                      />
                    </td>
                  </tr>
                </div>
              </div>
            </div>
            <button className="exercise-btn">Submit</button>
          </div>
        ) : (
          <h3>Exercise has not started yet</h3>
        )}
      </div>
    </form>
  );
};

export default ExerciseScreen;
