import React from 'react'
import PropTypes from 'prop-types'
import { withStore } from 'lite-store'

const LogResumer = ({ ds }) => (  
  <div>
    <h5>log list</h5>
    <ul>
      {
        ds.map((value, index) => <li key={index}> {value} </li>)// eslint-disable-line react/no-array-index-key
      } 
    </ul>
  </div>
)

LogResumer.propTypes = {
    ds: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default withStore(LogResumer, '_log')
