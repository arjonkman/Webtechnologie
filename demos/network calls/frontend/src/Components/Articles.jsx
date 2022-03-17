import Article from './Article'

import '../css/Articles.css'


function Articles(props) {

	if (props.hasOwnProperty('articles')) {
		let article_list = props.articles.map((article, key) => {
			return (
				<Article key={key} id={article.ID} body={article.Body} author={article.Author} />
			)
		})

		return (
			<div className='Articles row'>
				{article_list}
			</div>
		)
	}

	return null
}

export default Articles