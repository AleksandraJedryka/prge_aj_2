import React, {useEffect, useState} from 'react';

function ListOfItems(props) {

    const [users, setUsers] = useState([]);
    // https://jsonplaceholder.typicode.com/users
    useEffect(() => {
        // http://localhost:10000/app/get_users
        fetch('http://localhost:10000/app/get_users')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUsers(res)
            })

        console.log('działa', users)
    }, [])


    return (
        <div className="user-list-container">
            <h1 className="user-list-title"><span style={{color: '#e74c3c'}}>Lista</span> użytkowników</h1>
            <div className="user-list-card">
                <div className="user-list-wrapper">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Imię</th>
                                <th>Miasto</th>
                                <th>Ilość postów</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.location}</td>
                                    <td>{user.posts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListOfItems;