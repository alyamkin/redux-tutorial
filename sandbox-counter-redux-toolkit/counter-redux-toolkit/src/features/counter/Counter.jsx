import { useState } from 'react';
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsyncThunk,
  selectCounter,
  selectStatus,
} from './counterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Counter = () => {
  const [incrementAmount, setIncrementAmount] = useState('2');
  const incrementValue = Number(incrementAmount) || 0;
  const dispatch = useDispatch();
  const counter = useSelector(selectCounter);
  const status = useSelector(selectStatus);

  return (
    <>
      <h2 className="card">
        {status === 'loading' ? <p>Loading...</p> : counter}
      </h2>
      <div className="card">
        <div className="control-group">
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
      </div>
      <div className="card">
        <div className="control-group">
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
          />
          <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
            Add amount
          </button>
          <button onClick={() => dispatch(incrementAsyncThunk(incrementValue))}>
            Add amount Async
          </button>
        </div>
      </div>
    </>
  );
};
