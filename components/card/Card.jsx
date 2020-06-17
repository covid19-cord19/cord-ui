import PropTypes from 'prop-types'

export const Card = ({title, summary, score = 100, urls = []}) => (
    <div className="card">
        <article>
            <h2 className="card__title">{title}</h2>
            <p className="card__summary">{summary}</p>
            {urls.length > 0 &&
                <ul>
                {urls.map(url => <li key={url}>{url}</li>)}
                </ul>
            }
        </article>
        <div className="card__score">{Number.parseInt(score)}</div>
    </div>
)

Card.propTypes = {
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    score: PropTypes.number,
    urls: PropTypes.arrayOf(PropTypes.string)
}

export default Card
