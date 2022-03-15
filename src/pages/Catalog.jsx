import { useParams } from 'react-router-dom'
import { category as cate } from '../api/tmdbApi'
import { MovieGrid } from '../components/movie-grid/MovieGrid'
import { PageHeader } from '../components/page-header/PageHeader'

export const Catalog = () => {
  const { category } = useParams()

  return (
    <>
      <PageHeader>{category === cate.movie ? 'Movie' : 'TV'}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid cate={category} />
        </div>
      </div>
    </>
  )
}
