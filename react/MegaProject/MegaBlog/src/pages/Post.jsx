import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import service from '../appwrite/storage'
import { Button,Container } from '../components'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";




function Post() {
    const [post,setPost]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate()

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor=post && userData ? post.userId===userData.$id:false;

    useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    
                }
                
                
                else navigate("/");
            });
        } else navigate("/");

    },[slug, navigate])

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    

    return post ? (
    <div className="py-10 bg-gray-100 min-h-screen">
        <Container>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Image */}
                <div className="relative">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-[450px] object-cover"
                    />

                    {isAuthor && (
                        <div className="absolute top-5 right-5 flex gap-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-600 hover:bg-green-700"
                                    className="px-5 py-2 rounded-lg"
                                >
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-600 hover:bg-red-700"
                                className="px-5 py-2 rounded-lg"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8">

                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        {post.title}
                    </h1>

                    <hr className="mb-8" />

                    <div className="browser-css prose prose-lg max-w-none">
                        {parse(post.content)}
                    </div>

                </div>

            </div>
        </Container>
    </div>
) : null; 
}

export default Post
