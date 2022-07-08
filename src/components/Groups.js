import React from "react";

import classes from "./Groups.module.css";

const Groups = ({handler, title}) => {
  return (
      <div onClick={handler} className={classes.category}>{title}</div>
  );
};

export default Groups;
