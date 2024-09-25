import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    finished,
  } = useContext(Context);

  const handleEnter = (e) => {
    if (input.trim().length > 0 && finished && e.key == "Enter") onSent();
  };

  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleVoiceInput = () => {
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prevInput) => prevInput + transcript);
    };

    recognition.start(); 
  }

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Give me tips to help my child develop good study habits"
                  )
                }
              >
                <p>Give me tips to help my child develop good study habits</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Give me tips for how to grow my YouTube channel")
                }
              >
                <p>Give me tips for how to grow my YouTube channel</p>{" "}
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Help design a database schema for a business")
                }
              >
                <p>Help design a database schema for a business</p>
                <img src={assets.code_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Summarize the major events of the Cold War")
                }
              >
                <p>Summarize the major events of the Cold War</p>
                <img src={assets.message_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={handleEnter}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" onClick={handleVoiceInput}/>
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <a
              href="https://support.google.com/gemini/answer/13594961?visit_id=638627802782700801-449819425&p=privacy_notice&rd=1#privacy_notice"
              className="privacy-note"
            >
              Your privacy and Gemini Apps
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
