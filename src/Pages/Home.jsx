import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Center from '../Components/Layouts/Center'

export default function Home() {
    const [value, setvalue] = useState()
    return (
        <Center>
            <input type="text" onChange={e => setvalue(e.target.value)} />
            <br />
            <Button onClick={async e => await axios.post("http://localhost:5000/message", { message: value })}>Submit</Button>
        </Center >
    )
}
