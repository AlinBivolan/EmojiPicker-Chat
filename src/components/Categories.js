import React, { useRef, useState, createRef } from "react";

import classes from "./Categories.module.css";
import Groups from "./Groups";
import Emoji from "./Emoji";
import emojijson from "../constants/emoji.json";
import { Category, GroupCat } from "../constants/arrays";
import { strings } from "../constants/strings";

const Categories = ({ recent, changeValueRecent, changeValue }) => {
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const categorySection = useRef([]);
  const emojis = useRef(null);

  categorySection.current = [...Array(Category.length).keys()].map(
    (_, i) => categorySection.current[i] ?? createRef()
  );

  const scrollSmoothHandler = (index) => {
    if (index > -1) {
      categorySection.current[index].current.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      emojis.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
        {GroupCat.map((item, i) => (
          <Groups
            handler={() => {
              scrollSmoothHandler(i - 1);
            }}
            title={item.title}
          />
        ))}
      </div>
      <input
        onChange={(e) => handlerFilter(e.target.value)}
        type="type"
        placeholder={strings.placeHolder.search}
        className={classes.search}
        value={value}
      />
      <span ref={emojis} className={classes.emoji_container}>
        {value === "" ? (
          <>
            <h1 className={classes.category_name}>{strings.recentUsed}</h1>
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
            {Category.map((category, i) => (
              <Emoji
                categorySection={categorySection}
                changeValue={changeValue}
                category={category}
                i={i}
              />
            ))}
          </>
        ) : (
          <>
            {filteredData.map((value, key) => {
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
