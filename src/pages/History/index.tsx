import React, { useEffect, useState } from 'react'
import VideoItem from './VideoItem'
import videoApi from '../../utils/apis/videoApi';
import { Video } from '../../utils/dto/video';

export const HistoryPage = () => {
 const [videos, setVideos] = useState<Video[]>([]);
 useEffect(() => {
    const fetch = async () => {
        await videoApi.getHistory ()
        .then((data) => {
            console.log(data.data)
            setVideos(data.data || [])
        })

    }
    fetch();
 }, [])

  return (
    <div>
        <h3 className='text-5xl' style={{marginTop: "3vh", fontSize: "40px"}}>Watch history</h3>
        <div>
           {videos.map((video, index) => {
            return(<VideoItem key={index} video={video}/>)
           })}
        </div>
    </div>
  )
}
