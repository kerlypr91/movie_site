import React from 'react'
import { Input } from 'semantic-ui-react'

const Search = (props) => (
  <Input
    icon="search"
    value={props.value}
    className={props.className}
    placeholder="Search..."
    onChange={props.onChange}
  />
)

export default Search
