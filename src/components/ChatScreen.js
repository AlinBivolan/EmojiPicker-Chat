import { useState } from "react";
import classes from "./Display.module.css";
import { reactEmojiList } from "../constants/arrays";
import { chatConstants } from "../constants/strings";

const Display = ({ message, addReact, currentIndex, setCurrentIndex }) => {
  const [reactionModalHandler, setReactionModalHandler] = useState(null);

  const modalPicker = (event) => {
    setReactionModalHandler(currentIndex);
    event.currentTarget.style.display = "none";
  };

  return (
    <div className={classes.container}>
      <span className={classes.chat}>
        {message.map((item, id) => {
          return (
            <div
              onMouseOver={() => setCurrentIndex(id)}
              onMouseOut={() => {
                setCurrentIndex(null);
              }}
              key={id}
            >
              <div className={classes.messageReact}>{item.reaction}</div>
              <div className={classes.messageContent}>
                {currentIndex === id && (
                  <div onClick={modalPicker} className={classes.reactPicker}>
                    {chatConstants.emojiOpener}
                  </div>
                )}
                {reactionModalHandler === id && (
                  <div
                    className={classes.reactPicker}
                    onMouseLeave={() => setReactionModalHandler(false)}
                  >
                    {reactEmojiList.map((item, id) => {
                      return (
                        <div
                          onClick={() => {
                            addReact(item, id);
                            setReactionModalHandler(false);
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className={classes.messageRight}>{item.message}</div>
              </div>
              <div className={classes.messageDate}>
                {item.hour}
                {chatConstants.dot}
                {item.minutes}
                {chatConstants.dot}
                {item.seconds}
              </div>
            </div>
          );
        })}
      </span>
    </div>
  );
};

export default Display;
