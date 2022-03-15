import { useEffect, useState } from 'react'
import { category, tmbdApi } from '../../api/tmdbApi'
import { Swiper, SwiperSlide } from 'swiper/react'

import './movie-list.scss'
import { MovieCard } from '../movie-card/MovieCard'

export const MovieList = (props) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getList = async () => {
      let response
      const params = {}

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmbdApi.getMoviesList(props.type, params)

            break
          case category.tv:
            response = await tmbdApi.getTvList(props.type, params)
            break
        }
      } else {
        response = await tmbdApi.similar(props.category, props.id)
      }
      setItems(response.results)
    }

    getList()
  }, [])

  return (
    <Swiper grabCursor={true} spaceBetween={10} slidesPerView={8}>
      {items.map((item, ind) => (
        <SwiperSlide key={ind}>
          <MovieCard item={item} category={props.category} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
