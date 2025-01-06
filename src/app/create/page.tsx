import { Metadata } from 'next'
import React from 'react'
import CreateStablecoin from '.'

export const metadata:Metadata = {
    title: 'Stable Fun | Create',
    description: 'Create a stable fun',
  
}
const page = () => {
  return (
    <CreateStablecoin/>
  )
}

export default page