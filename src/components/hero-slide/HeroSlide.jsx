import { useEffect, useRef, useState } from 'react'
import { category, movieType, tmbdApi } from '../../api/tmdbApi'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { apiConfig } from '../../api/apiConfig'

import 'swiper/css'

import './hero-slide.scss'
import { Button, OutlineButton } from '../button/Button'
import { useHistory } from 'react-router-dom'
import { Modal } from '../modal/Modal'
import { Loader } from '../loader/Loader'
import { Header } from '../header/Header'

export const HeroSlide = () => {
  SwiperCore.use([Autoplay])

  const [movieItems, setMovieItems] = useState([])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 }
      setIsVisible(true)
      window.scrollTo(0, 0)
      try {
        const response = await tmbdApi.getMoviesList(movieType.popular, params)
        setMovieItems(response.results.slice(1, 5))
        setIsVisible(false)
      } catch (e) {
        console.log(e)
      }
    }

    getMovies()
  }, [])

  return (
    <>
      {isVisible ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {' '}
          <div className="hero_slide">
            <Swiper modules={[Autoplay]} grabCursor={true} spaceBetween={0} slidesPerView={1}>
              {movieItems.map((item, ind) => (
                <SwiperSlide key={ind}>
                  {({ isActive }) => (
                    <HeroSlideItem item={item} className={isActive ? 'active' : ''} />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  )
}

const HeroSlideItem = ({ item, className }) => {
  const [isActive, setIsActive] = useState(false)

  const history = useHistory()

  const background = apiConfig.originalImage(item.backdrop_path)

  const setTrailerModal = async () => {
    setIsActive(true)

    const modal = document.querySelector(`#modal_${item.id}`)

    const videos = await tmbdApi.getVideos(category.movie, item.id)

    if (videos.results.length) {
      const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key

      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer'
    }
  }

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push('/movie/' + item.id)}>Watch now</Button>
            <OutlineButton onClick={setTrailerModal}>Watch trailer</OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
      <div>
        <TrailerModal item={item} isActive={isActive} setIsActive={setIsActive} />
      </div>
    </div>
  )
}

const TrailerModal = ({ item, isActive, setIsActive }) => {
  const iframeRef = useRef()

  const onClose = () => {
    iframeRef.current.setAttribute('src', '')
    setIsActive(false)
  }
  return (
    <Modal isActive={isActive} id={`modal_${item.id}`} onClose={onClose}>
      <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
    </Modal>
  )
}
