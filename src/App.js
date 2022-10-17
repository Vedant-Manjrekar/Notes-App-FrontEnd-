import "./css/main.css";
import Navbar from "./Components/Nav";
import Notes from "./Components/Notes";
import { Suspense, useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function App() {
  const [notes, setNotes] = useState([]);
  const [addClick, setAddClick] = useState(false);
  const globalstate = useSelector((state) => state.update.data);
  const themeState = useSelector((state) => state.theme.data);

  const body = document.querySelector("body");
  body.style.backgroundColor = themeState.data ? "#202023" : "#ffffff";

  // * loading new data once there is a change in notes collection.
  useEffect(() => {
    axios.get("/notes/sync").then((response) => {
      setNotes(response.data);
    });
  }, [addClick]);

  // * loading new data once there is a change in fields.
  // * [globalstate.value] is indicator of change in fields.
  useEffect(() => {
    axios.get("/notes/sync").then((response) => {
      setNotes(response.data);
    });
  }, [globalstate.value]);

  useEffect(() => {
    const pusher = new Pusher("1c11be6060df351fd17f", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("notes");
    channel.bind("inserted", function (data) {
      setNotes([...notes, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [notes]);

  function addNote() {
    setAddClick((prev) => !prev);

    axios.post("/notes/new", {
      value: {
        heading: "Add Heading",
        body: "Add Content",
        color: globalstate.color,
      },
    });
  }

  return (
    <div className="App">
      <Navbar />

      <div className="notes--body">
        <Suspense fallback={"Loading..."}>
          {notes.map((note) => {
            // console.log(note.value);
            return (
              <Notes
                key={note._id}
                heading={note.value?.heading}
                body={note.value?.body}
                id={note._id}
                color={note.value?.color}
              />
            );
          })}
        </Suspense>
      </div>

      <button onClick={addNote} className="add--btn">
        <AddCircleIcon
          sx={{
            fontSize: "5rem",
            color: themeState.data ? "white" : "gray",
          }}
        />
      </button>
    </div>
  );
}

export default App;
