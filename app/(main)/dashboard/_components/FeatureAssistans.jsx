"use client"
import { BlurFade } from '@/components/magicui/blur-fade'
import { Button } from '@/components/ui/button'
import { CoachingExpert, CoachingOptions } from '@/services/Options'
import { useUser } from '@stackframe/stack'
import React from 'react'
import UserInputDialog from './UserInputDailogbox'
import ProfileDialog from './ProfileDialog'

function FeatureAssistans() {
    const user = useUser()
    return (
        <div>
           
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className='font-medium text-gray-500'>My Workspace</h2>
                    <h2 className='text-3xl font-bold'>Welcome back,{user?.displayName}</h2>
                </div>
               <ProfileDialog>
               <Button>Profile</Button>
               </ProfileDialog>
            </div>
           
            <div className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10'>
                {CoachingOptions.map((item, index) => (
                    <BlurFade key={item.icon} delay={0.25 +index* 0.05} inView>
                        <UserInputDialog CoachingOption={item}>
                        <div key={index} className='rounded-3xl flex flex-col justify-center items-center'>
                            <img src={item.icon} alt={item.name} width={150} height={150} className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all' />
                            <h2 className='mt-2'>{item.name}</h2>
                        </div>
                        </UserInputDialog>
                    </BlurFade>
                ))}
            </div>
        </div>
    )
}

export default FeatureAssistans