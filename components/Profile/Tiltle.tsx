"use client"
import { philosopher } from '@/app/philosopher'
import React from 'react'

const Tiltle = () => {
  return (
    <h1 className={`font-bold text-2xl m-2 mt-4 text-purple-700 ${philosopher?.className}`}>My Profile</h1>
  )
}

export default Tiltle
