import React from 'react'
import PropTypes from 'prop-types'
import {withActions} from 'lite-store'

const LogProducer = ({ actions }) => (
  <button onClick={() => actions.info("add a new log.")}>
    <h4>add a log</h4>
  </button>
)

LogProducer.propTypes = {
  actions: PropTypes.shape({
    info: PropTypes.func.isRequired,
  }).isRequired,
}

export default withActions(LogProducer, '_log')