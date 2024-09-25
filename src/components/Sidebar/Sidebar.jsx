import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {

    setRecentPrompt(prompt);
    await onSent(prompt);

  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setOpen((prev) => !prev)}
          src={assets.menu_icon}
          alt=""
          className="menu"
          title="Menu"
        />
        <div className="new-chat" title="New Chat" onClick={() => newChat()}>
          <img
            src={assets.plus_icon}
            alt=""
            style={
              !open
                ? { width: "12px", height: "20px", borderRadius: "50%" }
                : {}
            }
          />
          {open ? <p>New Chat</p> : null}
        </div>

        {open ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                  <img src={assets.message_icon} alt="" />
                  <p>{item.substring(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry" title="Help">
          <img src={assets.question_icon} alt="" />
          {open ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry" title="Activity">
          <img src={assets.history_icon} alt="" />
          {open ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry" title="Settings">
          <img src={assets.setting_icon} alt="" />
          {open ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
