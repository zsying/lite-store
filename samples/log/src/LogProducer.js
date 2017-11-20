import React from 'react'
import {withActions} from 'lite-store'

const LogProducer = ({ actions }) => {
  return (
    <button onClick={() => actions.info("add a new log.")}>
      <h4>add a log</h4>
    </button>
  )
}

export default withActions(LogProducer, '_log')