import React, { useState, createContext } from 'react'

export const MovieContext = createContext()

export const MovieContextProvider = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const [movies, setMovies] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)

  return (
    <MovieContext.Provider
      value={{
        movies: [movies, setMovies],
        searchValue: [searchValue, setSearchValue],
        filteredMovies: [filteredMovies, setFilteredMovies],
        ratingFilter: [ratingFilter, setRatingFilter],
      }}>
      {props.children}
    </MovieContext.Provider>
  )
}
