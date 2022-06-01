import React from "react";

import classes from "./Emoji.module.css";
import emoji from "../../constants/emoji.json";

const Emoji = ({category, changeValue}) => {
  return (
    <>
        <h1 className={classes.category_name}>{category}</h1>
        {emoji.map((icon) => {
          return (
            <div>
              {icon.category === `${category}` && (
                <div className={classes.emoji} onClick={() => changeValue(icon.emoji)}>{icon.emoji}</div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Emoji;
