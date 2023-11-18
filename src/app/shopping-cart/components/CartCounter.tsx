'use client';

interface Props {
  value?: number;
}

import React, { useState } from 'react'

export const CartCounter = ({value = 10}: Props) => {
  const [counter, setCounter] = useState(value);

  return (
    <>
      <span className="text-9xl"> {counter} </span>

      <div className="flex">

        <button
          onClick={() => setCounter(counter - 1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
          -1
        </button>

        <button
          onClick={() => setCounter(counter + 1)}
          className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
          +1
        </button>
      </div>
    </>
  )
}
