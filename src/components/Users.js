import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUsers,
  selectIsLoading,
  selectError,
  fetchUsers,
} from "../redux/users/usersSlice";
import { useEffect } from "react";

const Users = () => {
  const users = useSelector(selectUsers);
  console.log(users.results);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {users.results.map((user) => (
        <li key={user.id}>
          {user.name.first} {user.name.last}
        </li>
      ))}
    </ul>
  );
};

export default Users;
