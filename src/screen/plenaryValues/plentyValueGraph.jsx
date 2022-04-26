import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import ParticipantContext from "../../provider/participantProvider";
import axios from "axios";

const PlentyValueGraph = () => {
  //
  const { responseState, RESPONSE } = useContext(ParticipantContext);

  let allResponse = [];
  let sortedResStrr = [];
  let sortedResNum = [];
  const [getResponseData, setGetResponseData] = useState([]);

  const [sortedResString, setSortedResString] = useState([]);
  const [sortedResNumber, setSortedResNumber] = useState([]);
  var sortedRes = [];

  async function getAllResponseData() {
    await axios("/api/get/")
      .then((res) => {
        setGetResponseData(res.data.participantResponse);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    sortedRes.map((x) => {
      return sortedResNum.push(x[1]);
    });

    setSortedResString(sortedResStrr);

    setSortedResNumber(sortedResNum);
    RESPONSE.saveSortedResponse(sortedResStrr);

    // console.log({ sortedResStrr: sortedResStrr });
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

  // async function getProviderResponse() {
  //   await setGetResponseData(responseState.allResponse);
  //   // console.log({ getResponseData: getResponseData });
  // }

  useEffect(() => {
    getAllResponseData();
    saveResponse();
    saveResponseTwo();

    // getProviderResponse();
    responseVal();
  }, [getResponseData]);

  const barChartData = {
    labels: sortedResString,

    datasets: [
      {
        data: sortedResNumber,
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
      width={70}
      height={80}
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

export default PlentyValueGraph;
