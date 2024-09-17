import { useContext } from "react";
import { assets } from "../../../assets/gemini/assets";
import "./main.css";
import { Context } from "../../../context/GeminiContext";
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };
  return (
    <div className="main">
      <div className="nav">
        <p className="gradient-text font-semibold">Jobie Ai</p>
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {localStorage.getItem("user@first")} </span>
              </p>
              <p>How can i help your career grow?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Why am I not being recommended for senior software developer roles?"
                  )
                }
              >
                <p>
                  Why am I not being recommended for senior software developer
                  roles?{" "}
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Do you think I’m ready for my upcoming interview?"
                  )
                }
              >
                <p>Do you think I’m ready for my upcoming interview? </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Why am I not getting responses from the jobs I've applied for?"
                  )
                }
              >
                <p>
                  Why am I not getting responses from the jobs I've applied for?{" "}
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    "Why did I score low on the competency diagnostic?"
                  );
                }}
              >
                <p>Why did I score low on the competency diagnostic? </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
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
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent();
                }}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Jobie may display inaccurate info, including about people, so
              double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
