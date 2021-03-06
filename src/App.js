import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  //Variable to hold url
  const url = "https://zendogbackend.herokuapp.com"
  //State to Hold Dogs
  const [dogs, setDogs] = React.useState([])

  //Empty Dog
  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)

  //Function to get dogs via API
  const getDogs = () => {
    fetch(url + "/dog")
    .then(response => response.json())
    .then(data => {
      setDogs(data)
    })
  }

  //useEffect to do initial call of getDogs
  React.useEffect(()=>{
    getDogs()
  }, [])

  //handle create to create dogs
  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newDog)
    }).then(response => {
      getDogs()
    })
  }

//handleUpdate function for updating dogs
const handleUpdate = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  }).then(() => {
    // don't need the response from the post but will be using the .then to update the list of dogs
    getDogs();
  });
};

const selectDog = (dog) => {
  setSelectedDog(dog);
};

const deleteDog = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    // don't need the response from the post but will be using the .then to update the list of dogs
    getDogs();
  });
};

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display selectDog={selectDog} deleteDog={deleteDog} {...rp} dogs={dogs} />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={{}} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
