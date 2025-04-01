'use client'
import { UserContext } from '@/app/__context/userContext'
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@stackframe/stack';
import { Wallet2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function Credits() {
  const router=  useRouter()
    const { userData } = useContext(UserContext);
    const user = useUser();

    const CalculateProgress = () => {
        if (userData?.subscriptionId) {
            return Number(userData.credits / 200000) * 100
        }
        return Number(userData.credits / 100000) * 100
    }

    const handlepayment=()=>{
       router.push("dashboard/payment")
    }
    return (
        <div >
            <div className='flex gap-5 items-center'>
                <Image src={user?.profileImageUrl} width={60} height={60} alt='profile' className='rounded-full' />
                <div>
                    <h2 className='text-lg font-bold'>{user?.displayName}</h2>
                    <h2 className='text-gray-500'>{user?.primaryEmail}</h2>
                </div>
            </div>
            <hr className='my-3' />
            <div>
                <h2 className='font-bold'>Token Usage</h2>
                <h2>{userData?.credits}/{userData?.subscriptionId ? '200000' : '100000'}</h2>
                <Progress value={CalculateProgress()} className='my-3' />
                <div className='flex items-center justify-between mt-3'>
                    <h2 className='font-bold'>Current Plan</h2>

                    <h2 className='p-1 bg-secondary rounded-lg px-2'>
                        {userData?.subscriptionId ? 'Paid Plan' : 'Free Plan'}
                    </h2>
                </div>
                <div className='mt-5 p-5 border rounded-2xl'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h2 className='font-bold'>Pro Plan</h2>
                            <h2>20,0000 Tokens</h2>
                        </div>
                        <h2 className='font-bold'>$10/Months</h2>
                    </div>
                    <hr className='my-3' />
                    <Button onClick={()=>handlepayment()} className='w-full'><Wallet2 />Upgrade $10</Button>
                </div>
            </div> 
        </div>
    )
}

export default Credits