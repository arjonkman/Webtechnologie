import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login() {

	return (
		<Row className="justify-content-center">
			<Col md={4} xs={12}>
				<Form className="m-5">
					<Form.Group className="mb-3" controlId="email">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
					<Form.Text>
						<Link to="/register">
							<Button>
								Register
							</Button>
						</Link>
					</Form.Text>
				</Form>
			</Col>
		</Row>
	)
}

export default Login