import React, { useEffect, useState } from "react";

const UsersList = () => {
  //Get current users
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //delete a user
  const delUser = (id) => {
    window.location.reload();
    console.log("delete");
    fetch(`http://localhost:5000/api/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div>
      <h3>Users: </h3>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            {user.name}
            <button>Edit</button>
            <button onClick={() => delUser(user._id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
