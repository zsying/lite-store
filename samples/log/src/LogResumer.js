import React from 'react'
import {withStore} from 'lite-store'

const LogResumer = ({ds}) => (
    <div>
        <h5>log list</h5>
        <ul>
            {ds.map((value) => <il> {value} </il>)}            
        </ul>
    </div>
)
    
export default withStore(LogResumer, '_log')
