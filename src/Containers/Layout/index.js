import React, { useContext, useState, useEffect } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'

import { MovieContext } from '../../Context'

import Home from '../Home'
import Detail from '../Detail'
import All from '../All'
import Search from '../../Components/Search'
import FormExample from '../../Components/Form'
import Rating from '../../Components/Rating'

import { Checkbox } from 'semantic-ui-react'

import './index.scss'

const Routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
  {
    path: '/all',
    component: All,
  },
]

export default function Layout() {
  const { movies, searchValue, ratingFilter, filteredMovies } = useContext(
    MovieContext
  )
  const [moviesValue, setMovies] = movies
  const [searchStateValue, setSearchValue] = searchValue
  const [ratingFilterValue, setRatingFilter] = ratingFilter
  const setFilteredMovies = filteredMovies[1]

  const [hasSearch, setHeasSearch] = useState(true)
  const location = useLocation()

  /** Handlers */

  const handleSearchChange = (event, data) => {
    const { value } = data

    setSearchValue(value)
  }

  const onRateChange = (event, data) => {
    const { rating } = data

    setRatingFilter(rating)
  }

  const fetchMovies = () => {
    let fetchUrl =
      'https://api.themoviedb.org/3/discover/movie?api_key=1ec9f1bb1000878904d0361203ab8976'

    if (searchStateValue) {
      fetchUrl = `https://api.themoviedb.org/3/search/movie?api_key=1ec9f1bb1000878904d0361203ab8976&query=${encodeURI(
        searchStateValue
      )}`
    }

    fetch(fetchUrl, {
      method: 'GET',
      responseType: 'json',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error()

        return response.json()
      })
      .then((json) => {
        const { results } = json

        setMovies(results)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const filterByRating = () => {
    let filterMovieList = (moviesValue || []).filter(
      (item) =>
        item.vote_average <= ratingFilterValue * 2 &&
        item.vote_average >= (ratingFilterValue - 1) * 2
    )

    if (ratingFilterValue === 0) {
      filterMovieList = []
    }

    setFilteredMovies(filterMovieList)
  }

  /** Effects */

  useEffect(fetchMovies, [])

  useEffect(() => {
    fetchMovies()
    filterByRating()
  }, [searchStateValue, ratingFilterValue])

  useEffect(() => {
    setHeasSearch(location.pathname.includes('detail'))
  }, [location])

  /** Render */

  return (
    <main className="layout-container">
      <header className="layout-container__header">
        <nav className="header__menu">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
        <section className="header__texts">
          <h1>Your favorite movies. Explained.</h1>
          <h3>Figure out what happened. Then find out why.</h3>
          <div className="header__texts__search">
            {!hasSearch && (
              <Search
                className="search__component"
                value={searchStateValue}
                onChange={handleSearchChange}
              />
            )}
            {!hasSearch && (
              <div className="search__rating-filter">
                <span>Filter by: </span>&nbsp;&nbsp;&nbsp;
                <Rating
                  className="rating-filter__star"
                  onRate={onRateChange}
                  value={ratingFilterValue}
                />
              </div>
            )}
          </div>
        </section>
      </header>
      <section className="layout-container__content">
        <Switch>
          {Routes.map((route, index) => {
            const { exact, path, component: ComponentName } = route
            return (
              <Route key={index} exact={!!exact} path={path}>
                <ComponentName />
              </Route>
            )
          })}
        </Switch>
      </section>
      <footer className="layout-container__footer">
        <div className="footer__texts">
          <div className="footer__texts__content">
            <h2>Want to Annotate?</h2>
            <h4>
              Are you a writter? Feel like you could provide some freat feedback
              on movies? Here are the features and benefits of becoming a
              member.
            </h4>
            <Checkbox label="Discuss movies with friends" defaultChecked />
            <Checkbox
              label="Build your collection of discussed films"
              defaultChecked
            />
            <Checkbox label="Save your favorite movies" defaultChecked />
            <span className="footer__copy">&copy; BCC - Bear Code Company</span>
          </div>
        </div>
        <div className="footer__form">
          <FormExample />
        </div>
      </footer>
    </main>
  )
}
