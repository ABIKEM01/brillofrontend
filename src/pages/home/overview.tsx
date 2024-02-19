import React from 'react'
import HomeLayout from '../../components/layout/HomeLayout.tsx'
import ProfileCard from '../../components/cards/ProfileCard.js'
function Overview() {
  return (
    <HomeLayout>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4 justify-center items-stretch'>
        <ProfileCard/>
       

        </div>
    </HomeLayout>
  )
}

export default Overview