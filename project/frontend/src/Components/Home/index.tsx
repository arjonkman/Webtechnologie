import { Row, Col } from 'react-bootstrap'

import stonks from './favicon.svg';

function Home() {

  return (
    <Row className="pt-3 px-5 justify-content-center">
		<Col className="text-center">
			<h1><b>Paper-trading voor iedereen</b></h1>
			<p>Wil jij zonder enige kosten leren aandelen te verhandelen op het internet?</p>
			<p>Maak dan nu een account aan!</p>
			<h3><b>BartStonks</b></h3>
			<img src={stonks} height={500} />
		</Col>
	</Row>
  )
}

export default Home
