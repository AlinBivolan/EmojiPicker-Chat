import React, { useState } from "react";

import classes from "./Input.module.css";
import icon from "./../assets/Emoji_icon.svg";
import send from "./../assets/Send.svg";
import EmojiModal from "../components/EmojiModal";
import { Recent } from "../constants/arrays";
import { strings } from "../constants/strings";
import ChatScreen from "../components/ChatScreen";

const Input = () => {
  const [emoji, setEmoji] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [recentEmoji, setRecentEmoji] = useState(Recent);
  const [message, setMessage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const time = new Date();

  const [hour, minutes, seconds] = [
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ];

  const messageContent = {
    hour: hour,
    minutes: minutes,
    message: textValue,
    seconds: seconds,
    reaction: "",
  };

const addReact = (item) => {
  setMessage((prevState) => {
    const temp = [ ...prevState ];
    temp[currentIndex].reaction = item;
    return temp;
  });
};

  const sendMessage = () => {
    setTextValue("");
    if (textValue !== "") setMessage([...message, messageContent]);
  };

  const addEmoji = (emoji) => {
    if (!recentEmoji.includes(emoji)) {
      setRecentEmoji([...recentEmoji.splice(1, 17), emoji]);
    }
    setTextValue(textValue + emoji);
  };

  const addEmojiFromRecent = (emoji) => {
    setTextValue(textValue + emoji);
  };

  const openEmojiModal = () => {
    setEmoji(true);
  };

  const closeEmojiModal = () => {
    setEmoji(false);
  };

  return (
    <>
      <ChatScreen
        message={message}
        addReact={addReact}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <div className={classes.pickerContainer}>
        {emoji && (
          <EmojiModal
            onConfirm={closeEmojiModal}
            changeValue={addEmoji}
            changeValueRecent={addEmojiFromRecent}
            recent={recentEmoji}
          />
        )}
        <textarea
          onChange={(e) => setTextValue(e.target.value)}
          className={classes.display}
          placeholder={strings.placeHolder.input}
          value={textValue}
        />
        <div className={classes.buttons}>
          <img className={classes.icon} src={icon} onClick={openEmojiModal} />
          <img className={classes.send} src={send} onClick={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default Input;
