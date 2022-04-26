import React, { useState, useEffect, useContext } from "react";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import { Link } from "react-router-dom";
import FacilitatorNav from "../../component/navTab/facilitatorNav";
import axios from "axios";
import ParticipantContext from "../../provider/participantProvider";
import FacilitatorPollGraph from "../facilitatorPollResult/facilitator-poll-graph";

const FacilitatorPoll = () => {
  const [topVote, setTopVote] = useState([]);
  const [updatedRes, setUpdatedRes] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const [success, setSuccess] = useState("");
  const [isPollEnded, setIsPollEnded] = useState(false);
  const [isPollEnabled, setIsPollEnabled] = useState(false);
  const [showresult, setShowResult] = useState(false);

  var topres = [];
  function showTopRes() {
    topres = updatedRes.slice(0, 4);
    setGetSortedRes(topres);
    // console.log({ getSortedRes: getSortedRes });
  }

  useEffect(() => {
    showTopRes();
    if (localStorage.getItem("sorted-response")) {
      setUpdatedRes(JSON.parse(localStorage.getItem("sorted-response")));
    }
  }, [updatedRes, topVote]);

  async function handleEndPoll() {
    try {
      await axios
        .put("/api/end-poll/")
        .then((res) => {
          RESPONSE.saveEndPoll(res.data.endPoll);
          console.log({ endPoll: res.data });
          setSuccess("Poll Ended");
          setTimeout(() => {
            setSuccess("");
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleEnablePoll(e) {
    e.preventDefault();
    axios
      .put("/api/enable-poll")
      .then((res) => {
        // setOpen(true);
        // setIsPollEnabled(res.data.enablePoll)
        setSuccess("Poll Started");

        setTimeout(() => {
          // setIsloading(false);
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }
  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        // setIsPollEnded(res.data.endPoll);
        setShowResult(res.data.showResult);
        setIsPollEnabled(res.data.enablePoll);
        setIsPollEnded(res.data.endPoll);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getResponses();
  }, [isPollEnabled]);

  // async function handleCreatePoll() {
  //   await axios
  //     .post("/api/poll/")
  //     .then((res) => {
  //       setPollRes(res.data.enablePoll);
  //       RESPONSE.savePollStatus(res.data);
  //       console.log({ enablePoll: res.data });
  //       setSuccess("Poll enabled");
  //       setTimeout(() => {
  //         setSuccess("");
  //         navigate("/facilitator-poll");
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className="facilitator-poll-container">
      <div className="facilitator-poll">
        <TopBar />
        <div className="facilitator-poll-top">
          <FacilitatorNav
            ercerColor="#0f74be"
            pollBg="#0f74be"
            pollColor="#fff"
          />
        </div>
        <span style={{ color: "green" }}>{success && success}</span>

        <span style={{ color: "#0f74be" }}>
          These are the top four responses{" "}
        </span>
        <div className="faccilitator-poll-bottom">
          {getSortedRes.map((item, i) => {
            return (
              <div key={i} className="facilitator-check-box-container">
                <span className="checkboxspan">{item}</span>
              </div>
            );
          })}
        </div>
        <div className="show-result-container">
          {showresult && (
            <div className="fa-poll-result">
              <span>These are the results from the poll</span>
              <div className="facilitaor-result-graph">
                <FacilitatorPollGraph />
              </div>
            </div>
          )}
        </div>
        <div className="poll-btn-container">
          {isPollEnded ? (
            <span></span>
          ) : !isPollEnabled ? (
            <div className="poll-vote" onClick={handleEnablePoll}>
              <span>Start Poll </span>
            </div>
          ) : (
            <div className="poll-vote" onClick={handleEndPoll}>
              <span>End Poll & Show Result </span>
            </div>
          )}

          {/* <Link to="/facilitator-poll-result" className="poll-vote">
            <span>Show Poll Result</span>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default FacilitatorPoll;
