import React ,{useState,useEffect} from 'react'
import { Navigate,useNavigate,useParams } from 'react-router-dom'
import service from '../appwrite/storage'
import { PostForm,Container } from '../components'


function EditPost() {
    const [post,setPost]=useState(null);
    const navigate=useNavigate();
    const {slug}=useParams();
    useEffect(()=>{
        if(slug){
            service.getPost(slug)
                .then((post)=>{
                    setPost(post)
                })
        } 
        else{
            navigate('/')
        }
    },[slug,navigate])
    return post? (
        <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
    ):null;
    
}

export default EditPost
