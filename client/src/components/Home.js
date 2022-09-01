import React from "react";
import FetchUsers from "./FetchUsers";

const Home = () => {
  let newUser = { name: "" };

  function onChangeFunc(event) {
    newUser.name = event.target.value;
  }

  async function onSubmit(e) {
    // e.preventDefault();

    console.log(newUser.name);

    await fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    await fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <div>
      <FetchUsers />
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="nameInput">Name: </label>
          <input
            id="nameInput"
            name="nameInput"
            type="text"
            onChange={onChangeFunc}
          />
        </div>
        <button type="submit">Submit User</button>
      </form>
    </div>
  );
};

export default Home;
