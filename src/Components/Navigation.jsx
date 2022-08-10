import React, { useContext } from 'react'
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { UserState } from '../App'
export default function Navigation() {
    const { setlogin, login } = useContext(UserState)

    const handleLogOut = () => {
        setlogin({})
    }

    return <Navbar bg="dark" variant="dark">
        <Container>
            <Link to="/" className='navbar-brand'>Navbar</Link>
            <Nav className="mr-auto">
                <Link className='nav-link' to="/">Home</Link>
                <Link className='nav-link' to="/login">LogIn</Link>
                <Link className='nav-link' to="/users">Users</Link>
                {/* {
                    login.name && <Dropdown>
                        <Dropdown.Toggle variant='light'>
                            {login.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Dashboard</Dropdown.Item>
                            <button className='btn btn-outline-primary' onClick={handleLogOut}>LogOut</button>
                        </Dropdown.Menu>
                    </Dropdown>
                } */}
            </Nav>
        </Container>
    </Navbar>
}
