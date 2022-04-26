import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import done from "../../assets/icons/done.svg";
import wait from "../../assets/icons/wait.gif";
import axios from "axios";
import ScreenSize from "../../component/screenSize/screenSize";
const FacilitatorNav = ({
  responsBg,
  resposeColor,
  barBg,
  barColor,
  pollBg,
  pollColor,
  ercerBg,
  ercerColor,
}) => {
  const [open, setOpen] = React.useState(false);
  const [isloading, setIsloading] = useState(true);
  const size = ScreenSize();
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");

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

  function handleClearDb(e) {
    e.preventDefault();
    axios
      .put("/api/clear")
      .then((res) => {
        // setSuccess(res);
        // console.log(res);

        setOpen(true);
        localStorage.removeItem("sorted-response");
        setTimeout(() => {
          setIsloading(false);
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });

    axios.delete("/api/clear-response/");
  }
  return (
    <div className="facilitator-con">
      <div className="clear-response-con" onClick={handleClearDb}>
        Reset the System to Start Workshop
      </div>
      <div className="work-book-bottom-tap">
        <Link
          to="/facilitator"
          style={{ backgroundColor: responsBg }}
          className="work-book-tap-text-on"
        >
          <span className="ex-tab" style={{ color: resposeColor }}>
            EXERCISE A RESPONSE
          </span>
        </Link>
        <Link
          to="/facilitator-bar-chart"
          style={{ backgroundColor: barBg }}
          className="work-book-tap-text-on"
        >
          <span className="ex-tab" style={{ color: barColor }}>
            BAR CHART
          </span>
        </Link>
        <Link
          to="/facilitator-poll"
          style={{ backgroundColor: pollBg }}
          className="work-book-tap-text-off"
        >
          <span className="ex-tab" style={{ color: pollColor }}>
            POLL
          </span>
        </Link>
        <Link
          to="/facilitator-exercise-response"
          style={{ backgroundColor: ercerBg }}
          className="work-book-tap-text-off"
        >
          <span className="ex-tab" style={{ color: ercerColor }}>
            EXERCISE C RESPONSE
          </span>
        </Link>
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
              <span>Database successful cleared</span>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FacilitatorNav;
