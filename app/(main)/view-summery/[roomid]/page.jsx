'use client'
import { api } from '@/convex/_generated/api';
import { CoachingOptions } from '@/services/Options';
import { useQuery } from 'convex/react';
import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React from 'react'
import ChatBox from '../../discussion-room/[roomid]/__components/ChatBox';
import SummeryBox from './_components/SummeryBox';

function page() {
    const { roomid } = useParams();
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, { id: roomid })
    console.log(DiscussionRoomData)

    const GetAbstractImages = (option) => {
        const Coachingoption = CoachingOptions.find((item) => item.name == option)
        return Coachingoption?.abstract ?? '/ab1.png';
    }
    return (
        <div className='-mt-10'>
            <div className='flex justify-between items-end'>
                <div className='flex gap-7 items-center'>
                    <Image src={GetAbstractImages(DiscussionRoomData?.CoachingOption)} alt='abstract' width={100} height={100} className='w-[70px] h-[70px] rounded-full' />
                    <div>
                        <h2 className='font-bold'>{DiscussionRoomData?.topic}</h2>
                        <h2 className='text-gray-400'>{DiscussionRoomData?.CoachingOption}</h2>
                    </div>
                </div>
                <h2 className='text-gray-400 '>{moment(DiscussionRoomData?._creationTime).fromNow()}</h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5'>
                <div className='col-span-3 '>
                    <h2 className='text-lg font-bold mb-6'>Summery of Your Conversation</h2>
                    <SummeryBox summery={DiscussionRoomData?.summary}/>
                </div>
                <div className='col-span-2'>
                <h2 className='text-lg font-bold mb-6'>Your Conversation</h2>
                    {DiscussionRoomData?.conversation && <ChatBox transcript={DiscussionRoomData?.conversation}
                        CoachingOption={DiscussionRoomData?.CoachingOption}
                        enableFeedbackNotes={false}
                    />}
                </div>
            </div>
        </div>
    )
}

export default page