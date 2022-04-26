import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import NavTab from "../../component/navTab/navTab";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
import FacilitatorPollGraph from "../facilitatorPollResult/facilitator-poll-graph";

const PollScreen = () => {
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const navigate = useNavigate();
  const [topVote, setTopVote] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [updatedRes, setUpdatedRes] = useState([]);
  const [isPollEnd, setIsPollEnd] = useState(false);
  const [enablePoll, setEnablePoll] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showresult, setShowResult] = useState(false);
  const [isPollEmpty, setIsPollEmpty] = useState(false);
  const [voteInfo, setVoteInfo] = useState({
    allVotes: [],
    // response: [],
  });

  var topres = [];

  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        // RESPONSE.savePollStatus(res.data.enablePoll);
        RESPONSE.savePollStatus(res.data.enablePoll);
        setEnablePoll(res.data.enablePoll);
        setIsPollEnd(res.data.endPoll);
        setShowResult(res.data.showResult);
        setIsPollEmpty(res.data.isPollEmpty);

        // console.log({ isPollEnd: isPollEnd });
      })
      .catch((err) => {
        console.log(err);
      });
  }
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

  useEffect(() => {
    getResponses();
    // window.location.reload();
  }, [isPollEnd]);

  async function handleVote() {
    // console.log(topVote.length);
    // console.log({ topVote: topVote });
    try {
      if (topVote.length === 2) {
        var newVote = [];
        topVote.map((x) => {
          return newVote.push(x.name);
        });
        console.log({ newVote: newVote });

        await axios
          .put("/api/vote/", newVote)
          .then((res) => {
            console.log({ voteRes: res });
          })
          .catch((err) => {
            console.log(err + "error sending vote");
          });

        console.log({ topTwoVote: responseState.topTwoVote });
        setSuccess("Success");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError("You can only select two options");
        setTimeout(() => {
          setError("");
          console.log("error 1");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error + "vote not sent");
    }
  }

  return (
    <div className="poll-screen-container">
      <div className="poll-screen">
        <div className="poll-screen-top">
          <TopBar />
        </div>
        <div className="poll-screen-down">
          <NavTab
            wkBgColor="#fff"
            wkTextColor="#0f74be"
            pvTextColor="#0f74be"
            poBgColor="#0f74be"
            poTextColor="#fff"
          />
          <span style={{ color: "red" }}>{error}</span>
          {enablePoll ? (
            <div className="poll-screen-data-container">
              <h6>
                This polling unit is derived from the response with the highest
                numbers
              </h6>
              <span>You are required to select two options</span>

              <span style={{ color: "green" }}>{success && success}</span>

              <div className="topVote-vontainer">
                {getSortedRes.map((item, i) => {
                  return (
                    <div key={i} className="check-box-container">
                      <input
                        onChange={(e) => {
                          // add to list
                          if (e.target.checked) {
                            setTopVote([
                              ...topVote,

                              {
                                name: item,
                                id: i++,
                              },
                            ]);

                            // console.log({ topvote: topVote });
                          } else {
                            // remove from list

                            setTopVote([topVote.filter((x, i) => x !== item)]);
                          }
                        }}
                        value={topVote}
                        style={{ margin: "20px" }}
                        type="checkbox"
                        id={item.id}
                        className="check-box"
                      />
                      {/* &nbsp; */}
                      <label className="checkboxLabel" htmlFor={item.id}>
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div onClick={handleVote} className="poll-vote">
                <span>Vote</span>
              </div>
            </div>
          ) : isPollEmpty ? (
            <span>Poll Ended</span>
          ) : (
            <h4>No Poll Is Ready</h4>
          )}
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
        </div>
      </div>
    </div>
  );
};

export default PollScreen;
