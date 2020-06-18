import { Card } from './Card'

export const CardsList = ({ cards }) =>
    cards.map(card =>
        <Card
            key={card.id}
            title={card.title[0]}
            summary={card.body}
            urls={card.url[0]}
            score={card.score}
        />
    )

export default CardsList
