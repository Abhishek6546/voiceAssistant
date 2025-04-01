import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { AIModelToGenerateNotes } from '@/services/GlobalServices'
import { useMutation } from 'convex/react'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function ChatBox({ transcript, enableFeedbackNotes, CoachingOption }) {
    const [loading, setloading] = useState(false)

    const updateSummary = useMutation(api.DiscussionRoom.UpdateSummary)
    const { roomid } = useParams()
    const GenerateFeedbackNotes = async () => {
        setloading(true);
        try {
            const result = await AIModelToGenerateNotes(CoachingOption, transcript);
            console.log("Generated Notes Result:", result); // Debugging
            console.log("Extracted Content:", result?.content); // Ensure content exists
    
            // ✅ Check if `result.content` exists
            if (!result?.content) {
                throw new Error("No content returned from AI model.");
            }
    
            // ✅ Ensure we send `summary` field correctly
            await updateSummary({
                id: roomid,
                summary: result.content.trim() // Trim to remove extra spaces
            });
    
            toast('Feedback/Notes Saved!');
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error updating summary:", error);
            toast('Server Error, Try Again');
        } finally {
            setloading(false);
        }
    };
    
    return (
        <div>
            <div className='h-[60vh] bg-secondary rounded-4xl flex flex-col p-4 relative  overflow-auto'>
                {console.log("chat", transcript)}
                {transcript.map((item, index) => (
                    <div key={index} className={`flex ${item.role == 'user' && 'justify-end'}`}>
                        {item.role == 'assistant' ?
                            <h2 className="p-1 px-2 bg-primary mt-2 text-white inline-block rounded-md">{item?.content}</h2>
                            :
                            <h2 className="p-1 px-2 mt-2 bg-gray-200  inline-block rounded-md">{item?.content}</h2>
                        }
                    </div>
                ))}
            </div>
            {!enableFeedbackNotes ? <h2> </h2>
                :
                <Button className="mt-7 text-gray-100 text-sm" onClick={GenerateFeedbackNotes} disabled={loading}>
                    {loading && <LoaderCircle className='animate-spin' />}
                    Generate Feedback/Notes</Button>
            }
        </div>
    )
}

export default ChatBox