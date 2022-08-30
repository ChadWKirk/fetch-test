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

  return (
    <div>
      <h3>Users: </h3>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            {user.name}
            <button>Edit</button>
            <button>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
