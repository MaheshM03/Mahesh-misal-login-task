import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Badge, Button, Table } from 'react-bootstrap'
import Center from '../Components/Layouts/Center'

export default function Users() {
    const [datauser, setdatauser] = useState([])
    const [users, setusers] = useState([])
    const getAllUsers = async e => {
        const { data } = await axios
            .get("http://localhost:5000/users")
        console.log(data);
        setdatauser(data)
        setusers(data)
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <Center>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email ID</th>
                    <th>Mobile No.</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((item, index) => <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.userEmail}</td>
                        <td>{item.number}</td>
                    </tr>
                    )
                }

            </tbody>
        </Table>
    </Center>

}