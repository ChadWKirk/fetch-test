import React from "react";

function App() {
  async function onSubmit(e) {
    e.preventDefault();

    const newUser = { name: "chad" };

    await fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => console.log(data));

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
      <form onSubmit={onSubmit}>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
