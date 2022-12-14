import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Edit = () => {
  const [form, setForm] = useState({
    name: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      //fetchData() returns a promise
      const id = params.id.toString();
      const response = await fetch(
        //when calling response, pause JS execution until fetch is done
        `http://localhost:5000/api/user/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json(); //when record is called, pause JS execution until response is turned into JSON.
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/api/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Update User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
