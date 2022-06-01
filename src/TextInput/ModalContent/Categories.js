import React, { useRef, useState } from "react";

import classes from "./Categories.module.css";
import Groups from "./Groups";
import Emoji from "./Emoji";
import emojijson from "../../constants/emoji.json";
import { Category, GroupCat } from "../../constants/arrays";

const Categories = ({ recent, changeValueRecent, changeValue }) => {
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const emojis = useRef(null);
  const scrollDown = (elementRef) => {
    emojis.current.scrollTo({
      top: elementRef,
      behavior: "smooth",
    });
  };

  const handlerFilter = (text) => {
    const newFilter = emojijson.filter((value) => {
      return value.description.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(newFilter);
    setValue(text);
  };

  return (
    <div>
      <div className={classes.container}>
        {GroupCat.map((item) => (
          <Groups
            handler={() => scrollDown(item.cordonate)}
            title={item.title}
          />
        ))}
      </div>
      <input
        onChange={(e) => handlerFilter(e.target.value)}
        type="type"
        placeholder="Search"
        className={classes.search}
        value={value}
      />
      <span ref={emojis} className={classes.emoji_container}>
        {value === "" ? (
          <>
            <h1 className={classes.category_name}>Recent Used</h1>
            {
              <>
                {recent.map((emoji) => {
                  return (
                    <h1
                      onClick={() => {
                        changeValueRecent(emoji);
                      }}
                      className={classes.recent_emoji}
                    >
                      {emoji}
                    </h1>
                  );
                })}
              </>
            }
            {Category.map((category) => (
              <Emoji changeValue={changeValue} category={category} />
            ))}
          </>
        ) : (
          <>
            {filteredData.map((value) => {
              return (
                <span className={classes.filteredEmoji}>
                  <div
                    onClick={() => {
                      changeValueRecent(value.emoji);
                    }}
                    className={classes.filteredEmoji}
                  >
                    {value.emoji}
                  </div>
                </span>
              );
            })}
          </>
        )}
      </span>
    </div>
  );
};

export default Categories;
