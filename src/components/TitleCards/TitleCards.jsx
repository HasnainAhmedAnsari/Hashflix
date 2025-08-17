import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'




const TitleCards = ({title, category}) => {

    const cardsRef = useRef();

    const handleScroll = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {
        cardsRef.current.addEventListener('wheel', handleScroll);
    }, []);

    return (
        <div className='titlecards'>
            <h2>{title ? title : "Popular on Hashflix" } </h2>
            <div className="card-list" ref={cardsRef}>
                {cards_data.map((card, index) => (
                    <div className='card' key={index}>
                        <div className='card-image'>
                            <img src={card.image} alt={card.name} />
                        </div>
                        <h3>{card.name}</h3>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TitleCards