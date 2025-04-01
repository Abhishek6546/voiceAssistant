"use client";
import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea'
import { CoachingExpert } from '@/services/Options'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { LoaderCircle } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/__context/userContext';

function UserInputDialog({ children, CoachingOption }) {
    const [SelectedExpert, setSelectedExpert] = useState();
    const [Topic, setTopic] = useState();
    const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom)
    const [loading, setloading] = useState(false);
    const [openDialog, setopenDialog] = useState(false)
    const router=useRouter()
     const {userData}=useContext(UserContext)
    const onClickNext = async () => {
        setloading(true)
        console.log(userData._id)
        const result = await createDiscussionRoom({
            CoachingOption: CoachingOption.name,
            topic: Topic,
            expertName: SelectedExpert,
            uid:userData?._id
        })
        console.log(result)
        setloading(false)
        setopenDialog(false)
        router.push("/discussion-room/"+result)
    }
    return (
        <Dialog open={openDialog} onOpenChange={setopenDialog}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{CoachingOption.name}</DialogTitle>
                    <DialogDescription aschild>
                        <span className='mt-3'>
                            <span className='text-black'>Enter a topic to master your skills in {CoachingOption.name}</span>
                            <Textarea onChange={(e) => setTopic(e.target.value)} placeholder="Enter your topic here..." className="mt-2 mb-3" />
                        </span>
                        <span className='text-black mt-3 '>Select your coaching expert</span>
                        <span className='grid grid-cols-3 md:grid-cols-5 gap-4 mt-3'>

                            {CoachingExpert.map((item, index) =>
                            (
                                <span key={index} onClick={() => setSelectedExpert(item.name)}
                                    className={` p-1 rounded-2xl text-center`}
                                >
                                    <Image
                                        key={index}
                                        src={item.avatar}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className={`${SelectedExpert === item.name && 'border-2 p-1 border-primary'} rounded-2xl h-[80px] w-[90px] object-cover hover:scale-105 transition-al cursor-pointer`}
                                    />
                                    <span className='text-center'>{item.name}</span>
                                </span>
                            )
                            )}
                        </span>
                        <span className='flex gap-4 justifiy-end mt-5'>
                            <DialogClose aschild>
                                <Button variant={'ghost'}>Cancel</Button>
                            </DialogClose>
                            <Button onClick={onClickNext} disabled={!Topic | !SelectedExpert | loading}>
                                {loading && <LoaderCircle className='animate-spin' />}
                                Next</Button>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default UserInputDialog