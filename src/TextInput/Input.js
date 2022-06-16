import React, { useState } from "react";

import classes from "./Input.module.css";
import icon from "./../assets/Emoji_icon.svg";
import send from "./../assets/Send.svg";
import EmojiModal from "./EmojiModal";
import { Recent } from "../constants/arrays";
import { strings } from "../constants/strings";

function Input() {
  const [emoji, setEmoji] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [recentEmoji, setRecentEmoji] = useState(Recent);

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
        <img className={classes.send} src={send} />
      </div>
    </div>
  );
}

export default Input;
