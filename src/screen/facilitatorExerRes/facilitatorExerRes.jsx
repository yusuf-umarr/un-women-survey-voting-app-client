import React, { useState, useEffect } from "react";
import FacilitatorNav from "../../component/navTab/facilitatorNav";
import TopBar from "../../component/topBar/topBar";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";

const FacilitatorExerRes = () => {
  const [response, setResponse] = useState([]);
  const [getSortedRes, setGetSortedRes] = useState([]);
  const [shortedRes, setSortedRes] = useState([]);
  const [success, setSuccess] = useState("");
  const [todayDate, setTodayDate] = useState("");

  var topres = [];

  function showTopRes() {
    topres = shortedRes.slice(0, 2);
    setGetSortedRes(topres);
  }

  async function getAllReponses() {
    await axios
      .get("/api/exercise")
      .then((res) => {
        setResponse(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getResponses() {
    await axios("/api/get/")
      .then((res) => {
        setSortedRes(res.data.sortedResponse);
        // console.log({ isPollEnd: isPollEnd });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTodayDate() {
    let today = new Date();

    let dates =
      today.getDate() +
      "-" +
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getFullYear() +
      " " +
      today.getHours() +
      " ⁚ " +
      today.getMinutes();

    // console.log({ dates: dates });
    setTodayDate(dates);
  }
  let date = new Date();

  var todayDateTime = formatDate(date);

  function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 24;
    hours = hours ? hours : 24;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + " ⁚ " + minutes;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  useEffect(() => {
    // formatDate(date);
    // console.log(todayDateTime);
    getAllReponses();
    getResponses();

    showTopRes();
    getTodayDate();
  }, [response]);

  // function handleClearRes() {
  //   axios
  //     .delete("/api/clear-response")
  //     .then((res) => {
  //       setSuccess("Responses Cleared successfully");
  //       // console.log({ isPollEnd: isPollEnd });
  //       setTimeout(() => {
  //         setSuccess("");
  //         window.location.reload();
  //       }, 4000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function htmlToCSV(html, filename) {
    var data = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }

    // console.log({ row: row });
    // console.log({ cols: cols });

    downloadCSVFile(data.join("\n"), filename);
  }

  function downloadCSVFile(csv, filename) {
    var csv_file, download_link;

    csv_file = new Blob([csv], { type: "text/csv" });

    download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function handleCrvDownload() {
    var html = document.querySelector("table").outerHTML;
    htmlToCSV(html, `ExerciseC_[${todayDateTime}].csv`);
  }

  return (
    <div className="facilitator-res-container">
      <div className="facilitator-res">
        <TopBar />
        <div className="facilitator-res-top"></div>
        <div className="facilitator-res-middle">
          <FacilitatorNav
            ercerBg="#0f74be"
            // barColor="#fff"
            ercerColor="#fff"
            pollColor="#0f74be"
          />
        </div>
        <div className="facilitator-res-bottom">
          <div className="table-container-data">
            <table className="res-table" style={{ width: "100%" }}>
              <tr className="res-table-tr">
                <th colSpan="2">{getSortedRes[0]}</th>
                <th colSpan="2">{getSortedRes[1]}</th>
              </tr>
              <tr className="res-table-tr">
                <td>
                  {" "}
                  <h5>
                    In our work place what action is needed to live this value?
                  </h5>
                </td>
                <td>
                  {" "}
                  <h5>How will we hold ourselves accountable?</h5>
                </td>
                <td>
                  {" "}
                  <h5>
                    In our work place what action is needed to live this value?
                  </h5>
                </td>
                <td>
                  {" "}
                  <h5>How will we hold ourselves accountable?</h5>
                </td>
              </tr>
              {response.map((x, i) => {
                return (
                  <tr className="res-table-tr" key={i}>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCFirstA}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCFirstB}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCSecondA}
                    </td>
                    <td className="res-table-td">
                      {response[0 + i].exerciseCSecondB}
                    </td>
                  </tr>
                );
              })}
            </table>
            <div
              onClick={handleCrvDownload}
              className="download-response download-res-con"
              id="download-button"
            >
              Download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitatorExerRes;
