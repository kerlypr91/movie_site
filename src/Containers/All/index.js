import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { MovieContext } from '../../Context'

import Loader from '../../Components/Loader'

import './index.scss'

const imageUrlOrigin = 'https://image.tmdb.org/t/p/w500'

export default function All() {
  const { movies, ratingFilter, filteredMovies } = useContext(MovieContext)
  const [moviesValue] = movies
  const [ratingFilterValue] = ratingFilter
  const [filteredMoviesValue] = filteredMovies

  const history = useHistory()

  const onPosterClick = (id) => () => {
    history.push(`/detail/${id}`)
  }

  const renderContent = () => {
    const displayMovies =
      ratingFilterValue === 0 ? moviesValue : filteredMoviesValue

    if (!displayMovies) {
      return <Loader />
    }

    if (displayMovies.length === 0) {
      return <div>No movies have been found</div>
    }

    return (
      <React.Fragment>
        <div className="all-section__header">
          <h3 className="all-section__header__title">Movies</h3>
          <Link to="/home" className="header__link">
            Go back
          </Link>
        </div>
        <div className="all-section___movies-list">
          {displayMovies.map((item) => {
            const { poster_path, title, id } = item

            return (
              <div
                key={id}
                className="movies-list__movies__poster"
                onClick={onPosterClick(id)}>
                <img src={`${imageUrlOrigin}${poster_path}`} alt={title} />
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }

  return <section className="all-section">{renderContent()}</section>
}
