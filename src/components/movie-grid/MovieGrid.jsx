import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { category, movieType, tmbdApi, tvType } from '../../api/tmdbApi'
import { OutlineButton } from '../button/Button'
import { Header } from '../header/Header'
import { Loader } from '../loader/Loader'
import { MovieCard } from '../movie-card/MovieCard'

import './movie-grid.scss'
import { MovieSearch } from './MovieSearch'

export const MovieGrid = ({ cate }) => {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const [isVisible, setIsVisible] = useState(false)

  const { keyword } = useParams()

  useEffect(() => {
    const getList = async () => {
      window.scrollTo(0, 0)
      let response
      setIsVisible(true)
      if (!keyword) {
        const params = {}
        switch (cate) {
          case category.movie:
            response = await tmbdApi.getMoviesList(movieType.upcoming, params)
            break
          case category.tv:
            response = await tmbdApi.getTvList(tvType.popular, params)
            break
        }
      } else {
        const params = {
          query: keyword,
        }
        response = await tmbdApi.search(cate, { params })
      }
      setItems(response.results)
      setTotalPage(response.total_pages)
      setIsVisible(false)
    }

    getList()
  }, [cate, keyword])

  const loadMore = async () => {
    let response
    setIsVisible(true)
    if (!keyword) {
      const params = { page: page + 1 }
      switch (cate) {
        case category.movie:
          response = await tmbdApi.getMoviesList(movieType.upcoming, { params })
          break
        case category.tv:
          response = await tmbdApi.getTvList(tvType.popular, { params })
          break
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      }
      response = await tmbdApi.search(cate, { params })
    }
    setItems([...items, ...response.results])
    setPage(page + 1)
    setIsVisible(false)
  }

  return (
    <>
      {isVisible ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="mb-3">
            <MovieSearch category={cate} />
          </div>
          <div className="movie-grid">
            {items.map((item, ind) => (
              <MovieCard key={ind} item={item} category={cate} />
            ))}
          </div>
          {page < totalPage ? (
            <div className="movie-grid__loadmore">
              <OutlineButton className="small" onClick={loadMore}>
                Load More
              </OutlineButton>
            </div>
          ) : null}
        </>
      )}
    </>
  )
}
