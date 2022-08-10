import { useFormik } from "formik"
import React, { useState, useContext } from 'react'
import * as yup from "yup"
import { Alert, Button, Form } from 'react-bootstrap'
import axios from "axios"
import Center from '../Components/Layouts/Center'
import { useNavigate } from 'react-router-dom'
import { UserState } from "../App"

export default function Login() {
    const [show, setshow] = useState(false)
    const [error, seterror] = useState()
    const [val, setval] = useState(false)
    const navigate = useNavigate()
    const { setlogin, login } = useContext(UserState)

    const formik = useFormik({
        initialValues: {
            name: "",
            userEmail: "",
            number: "",
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Please Enter Name"),
            userEmail: yup
                .string()
                .required("Please Enter  Email")
                .email("Please Enter Valid Email"),
            number: yup
                .string()
                .required("Please Enter Mobile Number")
                .min(10, "please enter min 10 digits")
                .max(10, "Mobile Number Shouldn't exceed 10 digits"),
        }),
        onSubmit: async (values) => {
            const { data } = await axios.get("http://localhost:5000/users")
            const name = data
                .find(item => item.name === values.name)
            const email = data
                .find(item => item.userEmail === values.userEmail)
            const num = data
                .find(item => item.number === values.number)
            if (true) {
                if (!!name) {
                    alert("name already exist try another")
                }
                else if (!!email) {
                    alert("email already exist try another")
                }
                else if (!!num) {
                    alert("number already exist try another")
                }
                else if (!(!!name)) {
                    if (!(!!email)) {
                        if (!(!!num)) {
                            try {
                                await axios.post("http://localhost:5000/users", { ...values })
                                setlogin(values)
                                navigate('/')
                            } catch (err) {
                                seterror(err.message)
                                console.log(error);
                            }
                        }
                    }
                }
            }
        }
    })
    return (<Center>
        {
            show && <Alert variant='success'>
                {formik.values.name} Registered Successfully
            </Alert>
        }
        {
            error && <Alert variant='danger'>
                {error}
            </Alert>
        }
        <Form onSubmit={formik.handleSubmit} className='border border-danger alert alert-success mt-5 p-4'>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                    isValid={formik.touched.name && !formik.errors.name}
                    name='name' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.name}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userEmail}
                    isInvalid={formik.touched.userEmail && formik.errors.userEmail}
                    isValid={formik.touched.userEmail && !formik.errors.userEmail}
                    name='userEmail' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.name}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter Mobile No."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.number}
                    isInvalid={formik.touched.number && formik.errors.number}
                    isValid={formik.touched.number && !formik.errors.number}
                    name='number' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.number}
                </Form.Text>
            </Form.Group>

            <Button variant="primary" className='mt-3' type="submit">
                Submit
            </Button>
        </Form>
    </Center>
    )
}
