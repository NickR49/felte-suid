import { Component } from "solid-js";
import Modal from "@suid/material/Modal";
import Paper from "@suid/material/Paper";

interface Props {
  open: boolean;
  onClick: () => void;
  children: any;
}

const Dialog: Component<Props> = (props) => {
  return (
    <Modal
      open={props.open}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper sx={{ width: 400, height: 300, padding: 4 }}>
        {props.children}
        <button onClick={props.onClick}>Close</button>
      </Paper>
    </Modal>
  );
};

export default Dialog;
