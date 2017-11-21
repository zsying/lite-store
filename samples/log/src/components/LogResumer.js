import React from 'react'
import {withStore} from 'lite-store'

const LogResumer = ({ds}) => (  // eslint-disable-line react/prop-types
    <div>
        <h5>log list</h5>
        <ul>
      {ds.map((value, index) => <li key={index}> {value} </li>)}            
        </ul>
    </div>
)
    
export default withStore(LogResumer, '_log')
