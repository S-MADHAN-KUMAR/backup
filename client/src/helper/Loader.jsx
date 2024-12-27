import React from 'react'
import { PulseLoader } from 'react-spinners'

const Loader = () => {
  return (
    <PulseLoader
    className='w-full h-full justify-center gap-x-2 '
      color="#ffffff"
      size={10}
      loading={true}
    />

  )
}

export default Loader
