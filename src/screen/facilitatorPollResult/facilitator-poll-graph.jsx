import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ScreenSize from "../../component/screenSize/screenSize";
import axios from "axios";

const FacilitatorPollGraph = () => {
  //
  const [topVote, setTopVote] = useState([]);
  const [sortedVote, setSortedVote] = useState([]);
  const [uniqueVote, setUniqueVote] = useState([]);
  const [sortedVoteString, setSortedVoteString] = useState([]);
  const [sortedVoteNumber, setSortedVoteNumber] = useState([]);

  let allVote = [];
  let sortedVoteStrr = [];
  let sortedVoteNum = [];

  async function getTopVot() {
    await axios("/api/get/")
      .then((res) => {
        setTopVote(res.data.topTwoVote);
        // console.log({ topVote: topVote });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getTopVotData() {
    //remove the duplicate from the list
    const map = allVote.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );
    setSortedVote([...map.entries()].sort(({ [1]: a }, { [1]: b }) => b - a));
    // console.log({ sortedVote: sortedVote });
    sortedVote.map((x) => {
      return sortedVoteStrr.push(x[0]);
    });
    // console.log({ sortedVoteStrr: sortedVoteStrr });

    sortedVote.map((x) => {
      return sortedVoteNum.push(x[1]);
    });
    // console.log({ sortedVoteNum: sortedVoteNum });

    await setUniqueVote(Array.from(new Set(allVote)));
    // console.log({ uniqueVote: uniqueVote });

    setSortedVoteString(sortedVoteStrr);
    setSortedVoteNumber(sortedVoteNum);
  }
  async function getFirstVote() {
    topVote.map((x) => {
      return allVote.push(x[0]);
    });
  }
  async function getsecondVote() {
    topVote.map((x) => {
      return allVote.push(x[1]);
    });
  }

  useEffect(() => {
    getTopVot();
    getFirstVote();
    getsecondVote();
    getTopVotData();
    // console.log({ allVote: allVote });
  }, [topVote]);
  const barChartData = {
    labels: sortedVoteString,
    datasets: [
      {
        data: sortedVoteNumber,
        label: "",
        borderColor: "#3333ff",
        backgroundColor: "#547db4",
        fill: true,
      },
    ],
  };

  const barChart = (
    <Bar
      type="bar"
      width={50}
      height={30}
      options={{
        indexAxis: "y",
        plugins: {
          title: {
            display: true,
            // text: "",
          },
          legend: {
            display: false,
            position: "top",
          },
        },
      }}
      data={barChartData}
    />
  );

  return barChart;
};

export default FacilitatorPollGraph;
