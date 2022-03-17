import '../css/Article.css'

function Article(props) {

	let id = props.id
	let body = props.body
	let author = props.author

	return (
		<div className='Article col-md-4'>
			<h1>{props.author}</h1>
			<p>{props.body}</p>
		</div>
	)
}

export default Article