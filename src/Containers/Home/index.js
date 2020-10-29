import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { MovieContext } from '../../Context'

import Loader from '../../Components/Loader'

import './index.scss'

const imageUrlOrigin = 'https://image.tmdb.org/t/p/w500'

export default function Home() {
  const { movies, filteredMovies, ratingFilter } = useContext(MovieContext)
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

    const firstMovie = displayMovies[0]
    const followingMovies = displayMovies.slice(1, 9)

    return (
      <React.Fragment>
        <div className="home-section__header">
          <h3 className="header__title">Popular Movies</h3>
          <Link to="/all" className="header__link">
            View All
          </Link>
        </div>
        <div className="home-section___movies-list">
          <div
            className="movies-list__front_movie"
            onClick={onPosterClick(firstMovie.id)}>
            <img
              src={`${imageUrlOrigin}${firstMovie.poster_path}`}
              alt={firstMovie.title}
            />
          </div>
          <div className="movies-list__movies">
            {followingMovies.map((item) => {
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
        </div>
      </React.Fragment>
    )
  }

  return <section className="home-section">{renderContent()}</section>
}
