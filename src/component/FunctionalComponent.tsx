import React from 'react';

interface IUser {
  name: string;
  age: number;
}

interface IUser1 {
  name: string;
  age: number;
}

interface UserSub {
  iusers: IUser[];
  iusers2: IUser1[];
}

const Users: React.FC<UserSub> = ({ iusers, iusers2 }) => {
  return (
    <>
      <h3>Users from iusers:</h3>
      {iusers.map((user, index) => (
        <h5 key={`user1-${index}`}>User Name: {user.name}, Age: {user.age}</h5>
      ))}

      <h3>Users from iusers2:</h3>
      {iusers2.map((user, index) => (
        <h5 key={`user2-${index}`}>User Name: {user.name}, Age: {user.age}</h5>
      ))}
    </>
  );
};

export default Users;