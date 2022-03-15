import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConfig } from '../../api/apiConfig'
import { tmbdApi } from '../../api/tmdbApi'
import { Loader } from '../../components/loader/Loader'
import { MovieList } from '../../components/movie-list/MovieList'
import { CastList } from './CastList'

import './detail.scss'
import { VideoList } from './VideoList'

export const Detail = () => {
  const { id, category } = useParams()
  const [isVisible, setisVisible] = useState(false)
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = async () => {
      setisVisible(true)
      const response = await tmbdApi.detail(category, id, { params: {} })
      setItem(response)
      window.scrollTo(0, 0)
      setisVisible(false)
    }

    getItem()
  }, [category, id])

  return (
    <>
      {isVisible && <Loader />}
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="movie-content container mb-3">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres.slice(0, 5).map((item, ind) => {
                  return (
                    <span key={ind} className="genres__item">
                      {item.name}
                    </span>
                  )
                })}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
