import PropTypes from 'prop-types'
import './card.scss'

const getUrls = (url) => {
    const urls = url.split('; ')

    if (urls.length > 0) {
        return (
            <ul>
            {urls.map(url =>
                <li key={url}><a href={url}>{url}</a></li>
            )}
            </ul>
        )
    }

    return null
}

export const Card = ({title, summary, score = 100, urls = ''}) => (
    <div className="card">
        <article className="card__summary">
            <h2 className="card__title">{title}</h2>
            <p>{summary}</p>
            {getUrls(urls)}
        </article>
        <div className="card__score">
            <span>Score:</span> <span>{score.toFixed(2)}</span>
        </div>
    </div>
)

Card.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    score: PropTypes.number,
    urls: PropTypes.string,
}

export default Card
