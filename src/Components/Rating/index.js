import React from 'react'
import { Rating as SemanticRating } from 'semantic-ui-react'

const Rating = (props) => {
  return (
    <SemanticRating
      maxRating={5}
      defaultRating={parseInt(props.value / 2) || 0}
      icon="star"
      size="massive"
      disabled={props.disabled}
      clearable
      className={props.className || ''}
      onRate={props.onRate}
    />
  )
}

export default Rating
