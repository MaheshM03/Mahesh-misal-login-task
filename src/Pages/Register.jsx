import React, { useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import { Alert, Button, Form } from 'react-bootstrap'
import axios from "axios"
import Center from '../Components/Layouts/Center'

export default function Register() {
    const [show, setshow] = useState(false)
    const [error, seterror] = useState()
    const formik = useFormik({
        initialValues: {
            name: "john",
            userEmail: "john@gmail.com",
            password: "123",
            cpassword: "123"
        },
        validationSchema: yup.object({
            name: yup
                .string()
                .required("Please Enter Name"),
            userEmail: yup
                .string()
                .required("Please Enter  Email")
                .email("Please Enter Valid Email"),
            password: yup
                .string()
                .required("Please Enter Password")
                .min(2, "please enter min 2 char"),
            cpassword: yup
                .string()
                .required("please enter Confirm Password")
                .oneOf([yup.ref("password")], "password do Not Mach")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const URL = "http://localhost:5000/users"
                await axios.post(URL, { ...values, active: false, admin: true })
                setshow(true)
            } catch (err) {
                seterror(err.message)
                console.log(error);
            }

        }
    })
    return (<Center>
        {/* <h1>{JSON.stringify(formik.errors)}</h1> */}
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && formik.errors.password}
                    isValid={formik.touched.password && !formik.errors.password}
                    name='password' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.password}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Conform Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Conform password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.cpassword}
                    isInvalid={formik.touched.cpassword && formik.errors.cpassword}
                    isValid={formik.touched.cpassword && !formik.errors.cpassword}
                    name='cpassword' />
                <Form.Text className="invalid-feedback">
                    {formik.errors.cpassword}
                </Form.Text>
            </Form.Group>
            {/* <Form.Group controlId="formBasicPassword">
                    <Form.Label>Conform Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group> */}

            <Button variant="primary" className='mt-3' type="submit">
                Submit
            </Button>
        </Form>
    </Center>
    )
}
