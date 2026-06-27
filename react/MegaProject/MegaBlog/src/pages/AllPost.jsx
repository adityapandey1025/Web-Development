import React ,{useState,useEffect} from 'react'
import { PostCard ,Container} from '../components'
import service from '../appwrite/storage'
import { useNavigate } from 'react-router-dom'

function AllPost() {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        service.getPosts([])
            .then((post)=>{
                if(post){
                    setPosts(post.documents)
                }
            })
    },[])
    return (
        <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.length === 0 && (
                    <h1>No Posts Available</h1>
                )}
                {posts?.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
    )
}

export default AllPost
