import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassComponent from './component/ClassComponent'
import FunctionalComponent from './component/FunctionalComponent'

interface IUser {
  name: string;
  age: number;
}

interface UserSub {
  iusers: IUser[];
  iusers2: IUser[];
}



  
function App() {
  const users: IUser[] = [
    { name: "John Doe", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 32 }
  ];

  const users2: IUser[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 32 }
  ];
  return (
    <div className="App">
         <ClassComponent iusers={users} iusers2={users2} />
        {/* <FunctionalComponent iusers={users} iusers2={users2} />  */}

        
    </div>
  );
}

export default App;
