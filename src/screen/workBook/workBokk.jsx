import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import done from "../../assets/icons/done.svg";
import { Link } from "react-router-dom";
import TopBar from "../../component/topBar/topBar";
import wait from "../../assets/icons/wait.gif";
import ScreenSize from "../../component/screenSize/screenSize";
import NavTab from "../../component/navTab/navTab";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";
//
const WorkBook = () => {
  const [open, setOpen] = React.useState(false);
  const [isloading, setIsloading] = useState(true);
  const [responseOne, setResponseOne] = useState("");
  const [responseTwo, setResponseTwo] = useState("");
  const { responseState, RESPONSE } = useContext(ParticipantContext);
  const handleClose = () => setOpen(false);
  const size = ScreenSize();
  const [getResponseData, setGetResponseData] = useState([]);
  const [isPollEnd, setIsPollEnd] = useState(false);
  const [error, setError] = useState("");
  let allResponse = [];
  let sortedResStrr = [];
  var sortedRes = [];

  const responseVal = async () => {
    //remove the duplicate from the list
    const map = allResponse.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );

    sortedRes = [...map.entries()].sort(({ [1]: a }, { [1]: b }) => b - a);
    // await RESPONSE.saveSortedResponse(sortedRes);

    sortedRes.map((x) => {
      return sortedResStrr.push(x[0]);
    });

    axios.put("/api/sorted-response", sortedResStrr);
  };

  const saveResponse = async () => {
    await getResponseData.map((x, i) => {
      return allResponse.push(x.responseOne);
    });
  };
  const saveResponseTwo = async () => {
    await getResponseData.map((x, i) => {
      return allResponse.push(x.responseTwo);
    });
  };

  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        setGetResponseData(res.data.participantResponse);
        // console.log({ getResponseData: getResponseData });
        RESPONSE.saveAllResponse(res.data.participantResponse);
        RESPONSE.savePollStatus(res.data.enablePoll);
        setIsPollEnd(res.data.endPoll);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getResponses();
    saveResponseTwo();
    saveResponse();
    responseVal();
    // console.log({ allResponse: allResponse });
  }, [getResponseData]);

  const style = {
    position: "absolute",
    top: "50%",
    right: size.width < 600 ? "1%" : "40%",
    transform: "translateX(50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "0.5em",

    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/", {
        responseOne: responseOne.trim(),
        responseTwo: responseTwo.trim(),
      });

      setOpen(true);

      setTimeout(() => {
        setIsloading(false);
      }, 1500);
      setResponseOne("");
      setResponseTwo("");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);

      setResponseOne("");
      setResponseTwo("");
    }
  };

  return (
    <div className="work-book-container">
      <div className="work-book">
        <TopBar />
        <form className="work-book-bottom" onSubmit={handleSubmit}>
          <NavTab wkBgColor="#0f74be" />
          <span style={{ color: "red", marginTop: "1em" }}>
            {error && error}
          </span>

          <h4>Exercise A :</h4>
          <span>
            Share the values. What are the ones you have in common? Name two and
            write them down.{" "}
          </span>
          <div className="work-book-response-container">
            <div className="work-book-response-B">
              <span>Response A1 :</span>
              <input
                type="text"
                value={responseOne}
                required
                onChange={(e) => setResponseOne(e.target.value.toLowerCase())}
              />
            </div>
            <div className="work-book-response-B">
              <span>Response A2 :</span>
              <input
                type="text"
                value={responseTwo}
                required
                onChange={(e) => setResponseTwo(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          <div>
            <button className="work-book-btn">Submit</button>
          </div>
        </form>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isloading ? (
            <div className="work-book-modal">
              <img src={wait} alt="" />
            </div>
          ) : (
            <div className="work-book-modal">
              <img src={done} alt="" />
              <span>Your response has been submitted</span>
              <Link to="/plenary-values" className="go-to-plenary-btn">
                <span>Go To Plenary Value</span>
              </Link>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default WorkBook;

/*


*/
