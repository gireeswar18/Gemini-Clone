import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [finished, setFinished] = useState(true);

  const delayPara = (index, totalWords, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
	  if (index === totalWords - 1) {
		setFinished(true);
	  }
    }, 75 * index);
  };
  
  const newChat = () => {
	setLoading(false);
	setShowResult(false);
  }

  const onSent = async (prompt) => {
	setFinished(false);
    setResultData("");
    setLoading(true);
    setShowResult(true);

	let response;

    if (prompt !== undefined) {
      response = await run(prompt);
	  setRecentPrompt(prompt);
    }
	else {
		setPrevPrompts((prev) => [...prev, input]);
		setRecentPrompt(input);
		response = await run(input);
	}

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) newResponse += responseArray[i];
      else newResponse += "<b>" + responseArray[i] + "</b>";
    }

    let newResponse2 = newResponse.split("*").join("<br/>");

    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];

     delayPara(i, newResponseArray.length, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
	newChat,
	finished
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
