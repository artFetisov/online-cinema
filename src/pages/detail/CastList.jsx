import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConfig } from '../../api/apiConfig'
import { tmbdApi } from '../../api/tmdbApi'

export const CastList = ({ id }) => {
  const [casts, setCasts] = useState([])

  const { category } = useParams()

  useEffect(() => {
    const getCredits = async () => {
      const response = await tmbdApi.credits(category, id)
      setCasts(response.cast.slice(0, 5))
    }

    getCredits()
  }, [id, category])

  return (
    <div className="casts">
      {casts.map((item, ind) => {
        return (
          <div className="casts__item" key={ind}>
            <div
              className="casts__item__img"
              style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
            ></div>
            <div className="casts__item__name">{item.name}</div>
          </div>
        )
      })}
    </div>
  )
}
