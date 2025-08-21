import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWJkMWZkYTU1ZjhkMWU4NDA2ZTAxNGU4NjMyNjM0MCIsIm5iZiI6MTc1NTc1NTI5OC45OTEwMDAyLCJzdWIiOiI2OGE2YjMyMjZmNzAyMWE5ZTFhODFiMzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.krGC1fFSKpdCRn_SvrqOQ0QURmsKVVSCEji2TuyIKF8'
        }
    };

    

    const handleScroll = (e) => {
        e.preventDefault();
        cardsRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleScroll);
    }, []);

    return (
        <div className='titlecards'>
            <h2>{title ? title : "Popular on Hashflix"} </h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => (
                     <Link to ={`/player/${card.id}`} className='card' key={index}>
                        <div className='card-image'>
                            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.original_title} />
                        </div>
                        <h3>{card.original_title}</h3>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default TitleCards