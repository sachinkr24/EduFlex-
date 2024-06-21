import React from 'react'
import { Box } from '@mui/material'
function Banner() {
  return (
    <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundImage: `url("https://plus.unsplash.com/premium_photo-1681483561994-e91bc8ce5a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
      backgroundSize: 'cover',
      backgroundPosition: 'center', // Ensure the image is centered
      backgroundBlendMode: 'overlay',
      opacity: 1.0,
      borderRadius: 'inherit',
    }}
  />
  )
}

export default Banner