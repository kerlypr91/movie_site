import React, { useEffect, useContext, useState } from 'react'
import moment from 'moment'
import { useParams, useHistory, Link } from 'react-router-dom'

import { MovieContext } from '../../Context'

import './index.scss'

import Loader from '../../Components/Loader'
import Rating from '../../Components/Rating'

const imageUrlOrigin = 'https://image.tmdb.org/t/p/w500'

export default function Details() {
  const { id } = useParams()
  const { movies } = useContext(MovieContext)
  const [moviesValue] = movies

  const [movieDetail, setMovieDetail] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchMovieDetail = () => {
    const movieDetail =
      (moviesValue || []).find((item) => item.id === parseInt(id)) || null

    setMovieDetail(movieDetail)
    setLoading(false)
  }

  useEffect(fetchMovieDetail, [id])

  const renderContent = () => {
    if (loading) {
      return <Loader />
    }

    if (!movieDetail) {
      return (
        <div>Uh-oh, there was an error getting the details of this movie</div>
      )
    }

    const {
      title,
      release_date,
      vote_average,
      vote_count,
      overview,
    } = movieDetail

    console.log('vote_average', vote_average)

    return (
      <React.Fragment>
        <div className="detail-section__header">
          <h3 className="detail-section__header__title">Movie Details</h3>
          <Link to="/home" className="header__link">
            Go Back
          </Link>
        </div>
        <div className="detail-section___movie">
          <div className="detail-section__movie__poster">
            <img
              src={`${imageUrlOrigin}${movieDetail.poster_path}`}
              alt={movieDetail.title}
            />
          </div>
          <div className="detail-section__movie__content">
            <h1 className="content__title">{title}</h1>
            <p className="content__overview">{overview}</p>
            <div className="content__data">
              <span className="content__data__label">Release Date: </span>
              {moment(release_date).format('MMMM DD, YYYY')}
            </div>
            <div className="content__data">
              <span className="content__data__label">Votes: </span>
              {vote_count}
            </div>
            <div className="content__data">
              <span className="content__data__label">Rating: </span>
              <Rating disabled value={vote_average} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return <section className="detail-section">{renderContent()}</section>
}
