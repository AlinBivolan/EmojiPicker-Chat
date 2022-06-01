import { useRef } from "react";
import React from "react";

import classes from "./EmojiModal.module.css";
import Modal from "./Modal.js";
import Categories from "./ModalContent/Categories";

const EmojiModal = ({ onConfirm, recent, changeValue, changeValueRecent, filteredData }) => {
  const people = useRef(null);

  return (
    <Modal className={classes.backdrop} onConfirm={onConfirm}>
      <div refer={people} className={classes.container}>
        <Categories
          recent={recent}
          changeValue={changeValue}
          changeValueRecent={changeValueRecent}
          filteredData={filteredData}
        />
      </div>
    </Modal>
  );
};

export default EmojiModal;
