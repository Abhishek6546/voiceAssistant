import React from 'react'
import FeatureAssistans from './_components/FeatureAssistans'
import History from './_components/History'
import Feedback from './_components/Feedback'

function page() {
  return (
    <div>
      <FeatureAssistans/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-20'>
        <History/>
        <Feedback/>
      </div>
    </div>
  )
}

export default page