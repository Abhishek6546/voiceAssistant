'use client'
import { UserContext } from '@/app/__context/userContext';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { CoachingOptions } from '@/services/Options';
import { useConvex } from 'convex/react'
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'

function Feedback() {
  const convex = useConvex();
   const { userData } = useContext(UserContext);
   const [DiscussionRoomList, setDiscussionRoomList] = useState()
 
   useEffect(() => {
     userData && GetDiscussionRooms();
   }, [userData])
   const GetDiscussionRooms = async () => {
     const result = await convex.query(api.DiscussionRoom.GetAllDiscussionRoom, {
       uid: userData?._id
     })
     setDiscussionRoomList(result)
   }
 
   const GetAbstractImages = (option) => {
     const Coachingoption = CoachingOptions.find((item) => item.name == option)
     return Coachingoption?.abstract ?? '/ab1.png';
   }
   return (
     <div>
       <h2 className='font-bold text-xl'>
         Feedback
       </h2>
       {DiscussionRoomList?.length == 0 &&
         <h2 className='text-gray-400'>You dont have any previous lecture</h2>
       }
 
       <div className='mt-5'>
         {DiscussionRoomList && DiscussionRoomList.map((item, index) => (item.CoachingOption == 'Mock Interview' || item.CoachingOption == 'Ques Ans Prep') && (
           <div key={index} className='border-b-[1px] pb-3 mb-4 group flex justify-between items-center cursor-pointer'>
             <div className='flex gap-7 items-center'>
               <div className=''>
                 <Image src={GetAbstractImages(item.CoachingOption)} alt={"abstract"} width={70} height={70} className='rounded-full h-[50px] w-[50px]' />
               </div>
               <div>
                 <h2 className='font-bold'>{item.topic}</h2>
                 <h2 className='text-gray-400'>{item.CoachingOption}</h2>
                 <h2 className='text-gray-400 text-sm'>{moment(item._creationTime).fromNow()}</h2>
               </div>
             </div>
          <Link href={'/view-summery/'+item._id}>
          <Button variant='outline' className='invisible cursor-pointer group-hover:visible'>View Notes</Button>
          </Link>
           </div>
         ))}
       </div>
     </div>
   )
 }

export default Feedback