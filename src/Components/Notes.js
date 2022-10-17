import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdate } from "../features/updateSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorLensIcon from "@mui/icons-material/ColorLens";

function Notes({ id, heading, body, color }) {
  let [numberOfText, setNumberOfText] = useState(1);
  let [text, setText] = useState(body);
  let [head, setHead] = useState(heading);
  let [openInput, setOpenInput] = useState(false);
  let [headingInp, setHeadingInp] = useState(false);
  const dispatch = useDispatch();
  const globalstate = useSelector((state) => state.update.data);
  const themeState = useSelector((state) => state.theme.data);

  // ? CSS for Note Body. (changes according to light and dark mode.)
  const note_css = {
    backgroundColor: !themeState.data && "white",
    background: themeState.data
      ? "#202023"
      : `linear-gradient(145deg, ${color}, #f0f0f0)`,
    border: themeState.data ? ".8px solid white" : ".8px solid gray",
    color: themeState.data ? "white" : "black",
  };

  // * Function to update the flag in global state to represent change in note.
  function changedFlag(flag) {
    dispatch(
      toggleUpdate({
        value: !flag,
      })
    );
  }

  // * Function to change color of Note.
  function changeColor(e) {
    axios.patch(`/update/${id}`, {
      value: {
        heading,
        body,
        color: e.target.value,
      },
    });

    changedFlag(globalstate.value);
  }

  // * Function to Delete Note
  function deleteNote() {
    changedFlag(globalstate.value);

    axios.delete(`/delete/${id}`).then((response) => console.log(response));
  }

  // * functions to change heading values.
  function updateHeadFn() {
    changedFlag(globalstate.value);

    // * Sets visibility of input text of Heading.
    setHeadingInp((prev) => !prev);

    axios.patch(`/update/${id}`, {
      value: {
        heading: document.getElementById("heading")?.value,
        body,
        color,
      },
    });

    // * Function to display text when input box is removed.
    setHead((prevHead) =>
      document.getElementById("heading")?.value == ""
        ? prevHead
        : document.getElementById("heading")?.value
    );
  }

  // * Logic for toggling the visibilty of input text.
  function isVisibleHead() {
    setHeadingInp((prev) => !prev);
  }

  // * Functions to Update Text field.
  function updateTxtFn(event) {
    changedFlag(globalstate.value);

    // * Removes input text.
    setOpenInput((prev) => !prev);

    // * CRUD Request for updating the text in Heading.
    axios.patch(`/update/${id}`, {
      value: {
        heading,
        body: document.getElementById("textBox")?.value,
        color,
      },
    });

    setText(document.getElementById("textBox")?.value);
  }

  // * Function to make text field visble/invisible
  function isVisible(e) {
    setOpenInput((prev) => !prev);
  }

  return (
    <div className="note--body" style={note_css}>
      <div onClick={deleteNote} className="delete">
        <DeleteIcon />
      </div>

      {/* //* Heading */}
      <div
        className="note--heading"
        onClickCapture={isVisibleHead}
        onBlur={updateHeadFn}
      >
        {headingInp ? (
          <input
            defaultValue={head}
            autoFocus
            type="text"
            name=""
            id="heading"
            placeholder={heading !== "" ? heading : "Add Text"}
          />
        ) : (
          <p
            className="heading--holder"
            id="headingHolder"
            onClick={isVisibleHead}
          >
            {" "}
            {heading}
          </p>
        )}
      </div>

      {/* //* Text Field */}
      <div className="textBox" onClickCapture={isVisible}>
        {openInput ? (
          <textarea
            defaultValue={text}
            onBlur={updateTxtFn}
            type="text"
            autoFocus
            name=""
            id="textBox"
            cols="30"
            rows="10"
          ></textarea>
        ) : (
          <p
            id="textHolder"
            style={{ color: themeState.data ? "white" : "#5b5b5b" }}
            onClick={isVisible}
          >
            {" "}
            {body}{" "}
          </p>
        )}
      </div>

      <div className="color">
        <input
          type="color"
          name=""
          id="color--picker"
          className="color--pickerC"
          onInput={changeColor}
        />
        <label>
          <ColorLensIcon />
        </label>
      </div>
    </div>
  );
}

export default Notes;
