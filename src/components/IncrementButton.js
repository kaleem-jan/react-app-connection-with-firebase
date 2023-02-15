import React from 'react'
import { useReducer } from 'react'

function IncrementButton() {
    const [state, dispatch] = useReducer(
        function reducer(state, action){
            if(action.type === 'increment'){
                return {initialValue: state.initialValue+1 }
            }
            if(action.type=== "decrement"){
                return{initialValue: state.initialValue-1}
            }
            throw Error('unknown action');
        }, 
        {initialValue: 0})
    return(
        <>
        <button onClick={()=>
            {dispatch({type: 'increment'})}
        }> incremented by 1</button>
        <button
         onClick={
           ()=>  {{dispatch({type: 'decrement'})}}
         }
        >Decrement</button>
        <p>increment by 1:  {state.initialValue}</p>
        </>

    )
}

export default IncrementButton
