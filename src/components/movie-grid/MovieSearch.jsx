import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input } from '../input/Input'
import { Button } from '../button/Button'
import { category } from '../../api/tmdbApi'

export const MovieSearch = (props) => {
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

  const history = useHistory()

  const goToSearch = useCallback(() => {
    if (keyword.trim().length) {
      history.push(`/${category[props.category]}/search/${keyword}`)
    }
  }, [keyword, props.category, history])

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault()
      if (e.keyCode === 13) {
        goToSearch()
      }
    }
    document.addEventListener('keyup', enterEvent)
    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [keyword, goToSearch])

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  )
}
