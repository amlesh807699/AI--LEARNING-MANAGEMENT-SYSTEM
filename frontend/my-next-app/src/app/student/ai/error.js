"use client";

const error = ({error,reset}) => {
  return (
    <div>
        <h1>something went wrong</h1>
        <p>{error}</p>

        <button onClick={reset}>try again</button>
    </div>
  )
}

export default error