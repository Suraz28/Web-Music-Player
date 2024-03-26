import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import "./Admin.css";
import { ImFileEmpty } from "react-icons/im";
import axios from 'axios';

const Admin = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/login')
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/login/${id}`)
            .then(response => {
                const updatedUserList = userList.filter(user => user.id !== id);
                setUserList(updatedUserList);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className='admin'>
            <div className='admindiv'>
                <div className='admindivtexts'>
                    <h3>Administrator Panel</h3>
                    <Link to="/" style={{textDecoration: "none", color: "inherit", cursor: "pointer"}}>
                        <RxCross2 style={{fontSize: "25px", cursor: "pointer"}}/>
                    </Link>
                </div>
                <div className='adminpanel-userlist'>
                {userList.length === 0 ? (
                    <div style={{height: "100%", width: "100%", display:"flex", alignItems: "center", justifyContent: "center"}}>No Current users <br/><ImFileEmpty style={{color: "#dfdfdf", fontSize: "25px"}}/></div>
                    ) : (
                    <div className="usersist">
                        {userList.map((user, i) => (
                            <div className='eachuserlist' key={user.id}>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <button className="button" onClick={() => handleDelete(user.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
                </div>
                <div className='logout'>
                  <Link to="/"><button className='button'>Logout</button></Link>
                </div>
            </div>
        </div>
    );
}

export default Admin;
