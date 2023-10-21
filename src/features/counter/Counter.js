import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)
    const addValue = Number(incrementAmount) || 0
    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }

  return (
    <section>
        <h3>COUNT!</h3>
        <p>{count}</p>
        <div>
            <button onClick={() => {dispatch(increment())}}>+</button>
            <button onClick={() => {dispatch(decrement())}}>-</button>            
        </div>
            <input
                type='number'
                placeholder='eg 1,2,3....'
                value={incrementAmount}
                onChange={(e) => setIncrementAmount(e.target.value)}
            />
        <div>
            <button 
                onClick={() => {dispatch(incrementByAmount(addValue))}}
                >ADD AMOUNT
            </button>
            <button onClick={() => {resetAll()}}>Reset</button>            
        </div>
    </section>
  )
}

export default Counter