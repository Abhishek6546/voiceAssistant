import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

function AppHeader() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center'>
        <Image src={'/logo.webp'} width={50} height={60} alt='logo' className='rounded-full'/>
        <UserButton/>
    </div>
  )
}

export default AppHeader