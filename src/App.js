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

  const theme = {
    backgroundColor: themeState.data && "#202023",
    color: themeState.data ? "white" : "white",
    backgroundColor: themeState.data ? "#333333" : "#9cd14c",
  };

  // * loading new data once there is a change in notes collection.
  useEffect(() => {
    axios.get("/notes/sync").then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [addClick]);

  // * loading new data once there is a change in fields.
  // * [globalstate] is indicator of change in fields.

  // useEffect(() => {
  //   axios.get("/notes/sync").then((response) => {
  //     console.log(response.data);
  //     setNotes(response.data);
  //   });
  // }, [colorsArr]);

  // for (const color in notes.value) {
  //   console.log(color);
  // }

  // let prop = notes.filter((note) => note);

  // const colorsArr = [];

  // prop.map((val) => colorsArr.push(val.value.color));
  // prop.filter((val) => val.value.color);

  useEffect(() => {
    axios.get("/notes/sync").then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  }, [globalstate]);

  console.log(globalstate.color);

  console.log(notes);

  useEffect(() => {
    const pusher = new Pusher("1c11be6060df351fd17f", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("notes");
    channel.bind("inserted", function (data) {
      // alert(JSON.stringify(data));
      setNotes([...notes, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [notes]);

  console.log(notes);

  function addNote() {
    axios.post("/notes/new", {
      value: {
        heading: "Add Heading",
        body: "Add Content",
        color: globalstate.color,
      },
    });
    setAddClick((prev) => !prev);
  }

  return (
    <div className="App">
      <Navbar />

      <div className="notes--body">
        <Suspense fallback={"Loading..."}>
          {notes.map((note) => {
            console.log(note.value);
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
