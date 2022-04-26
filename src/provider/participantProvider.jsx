import React, { useReducer, useContext } from "react";

const ParticipantContext = React.createContext(null);

const participantReducer = (responseState, action) => {
  switch (action.type) {
    case "all-response": {
      // const item = action.payload;

      return {
        ...responseState,
        allResponse: action.payload,
      };
    }
    case "top-two-vote": {
      return {
        ...responseState,
        topTwoVote: [...responseState.topTwoVote, action.payload],
      };
    }
    case "sorted-response": {
      return {
        ...responseState,
        sortedResponse: action.payload,
      };
    }
    case "enable-poll": {
      return {
        ...responseState,
        enablePoll: action.payload,
      };
    }
    case "end-poll": {
      return {
        ...responseState,
        endPoll: action.payload,
      };
    }
  }
};

export const ParticipantProvider = (props) => {
  const [responseState, dispatch] = useReducer(participantReducer, {
    allResponse: [],
    topTwoVote: [],
    sortedResponse: [],
    enablePoll: false,
    endPoll: false,
  });

  async function saveAllResponse(val) {
    localStorage.setItem("allResponse", JSON.stringify(val));
    dispatch({
      type: "all-response",
      payload: val,
    });
  }
  async function saveTopTwoVote(val) {
    localStorage.setItem("top-two-vote", JSON.stringify(val));
    dispatch({
      type: "top-two-vote",
      payload: val,
    });
  }
  async function saveSortedResponse(val) {
    localStorage.setItem("sorted-response", JSON.stringify(val));
    dispatch({
      type: "sorted-response",
      payload: val,
    });
  }

  async function savePollStatus(val) {
    localStorage.setItem("enable-poll", val);
    dispatch({
      type: "enable-poll",
      payload: val,
    });
  }
  async function saveEndPoll(val) {
    localStorage.setItem("end-poll", val);
    dispatch({
      type: "end-poll",
      payload: val,
    });
  }

  async function recoverAllResponse() {
    if (localStorage.getItem("allResponse")) {
      const allResponse = JSON.parse(localStorage.getItem("allResponse"));
      dispatch({ type: "all-response", payload: allResponse });
    }
  }
  async function recovertopTwoVote() {
    if (localStorage.getItem("top-two-vote")) {
      const topTwoVote = JSON.parse(localStorage.getItem("top-two-vote"));
      dispatch({ type: "top-two-vote", payload: topTwoVote });
    }
  }

  const actions = {
    saveAllResponse,
    recoverAllResponse,
    saveTopTwoVote,
    recovertopTwoVote,
    saveSortedResponse,
    savePollStatus,
    saveEndPoll,
  };

  return (
    <ParticipantContext.Provider value={{ responseState, RESPONSE: actions }}>
      {props.children}
    </ParticipantContext.Provider>
  );
};

export default ParticipantContext;
