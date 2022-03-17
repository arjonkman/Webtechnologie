import { useState, useEffect } from 'react'

import Articles from './Articles'


function Body() {
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(
			"http://localhost:5000/api?amount=3")
			.then((res) => res.json())
			.then((json) => {
				setData(json)
			})
	}, [])


	return (
		<section className="Body">
			<Articles articles={data} />
		</section>
	)
}

export default Body