import React, { Fragment } from "react";

import classes from "./Modal.module.css";

const Backdrop = ({onConfirm}) => {
  return <div className={classes.backdrop} onClick={onConfirm}></div>
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({onConfirm, children}) => {
  return (
    <Fragment className={classes.backdrop}>
      <Backdrop className={classes.backdrop} onConfirm={onConfirm} />
      <ModalOverlay className={classes.backdrop}>{children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
