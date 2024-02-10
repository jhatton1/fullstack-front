import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {
    const [user, setUser] = useState({
        id: '',
        name: '',
        username: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">User Details</h2>
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : (
                        <div className="card">
                            <div className="card-header">
                                Details of User ID: {user.id}
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b>Name:</b> {user.name}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Username:</b> {user.username}
                                    </li>
                                    <li className="list-group-item">
                                        <b>Email:</b> {user.email}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    <Link className="btn btn-primary my-2" to="/">
                        Back to Home
                    </Link>
                    <Link className="btn btn-secondary my-2 mx-2" to={`/edit/${id}`}>
                        Edit User
                    </Link>
                </div>
            </div>
        </div>
    );
}
