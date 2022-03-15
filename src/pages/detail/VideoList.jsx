import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { tmbdApi } from '../../api/tmdbApi'

export const VideoList = ({ id }) => {
  const [videos, setVideos] = useState([])

  const { category } = useParams()

  useEffect(() => {
    const getVideos = async () => {
      const response = await tmbdApi.getVideos(category, id)
      setVideos(response.results.slice(0, 5))
    }

    getVideos()
  }, [])
  return (
    <>
      {videos.map((item, ind) => (
        <Video item={item} />
      ))}
    </>
  )
}

const Video = ({ item }) => {
  const iframeRef = useRef()

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px'
    iframeRef.current.setAttribute('height', height)
  })

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.title}</h2>
      </div>
      <iframe
        ref={iframeRef}
        width="100%"
        title="video"
        src={`https://www.youtube.com/embed/${item.key}`}
      ></iframe>
    </div>
  )
}
