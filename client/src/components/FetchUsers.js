import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
