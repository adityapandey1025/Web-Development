import React from 'react'
import { useParams,useLoaderData } from 'react-router-dom';



function User() {
    const {leetcode}=useParams();
    const data=useLoaderData();
    return (
        <div>
            <h1>This is url  {leetcode}</h1>
            <h2>Birthday is {data.birthday}</h2>
            <h2>Ranking is {data.ranking}</h2>
        </div>
    )
}

export default User;
