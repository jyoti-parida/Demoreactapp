import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
interface IUser{
  name: string,
  age: number
}
interface IUser1{
  name: string,
  age: number
}
interface UserSub{
  iusers:IUser[],
  iusers2:IUser1[]
}
export default class Users extends React.Component<UserSub>{
  constructor(props: UserSub){
  super(props)
  }
  render(): React.ReactNode{
  return(
          <>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='text-center'>
                  <div className='card p-3'>
                    <div className='card-body'>
                      <table className='table table-primary table-stripped table-bordered'>
                        <thead>
                          <tr>
                            <th>Sl no</th>
                            <th>Name</th>
                            <th>Age</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.iusers.map((user, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                          </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
  }
}