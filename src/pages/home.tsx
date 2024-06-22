import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Skeleton from "../components/skeleton/Skeleton"


const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/login")
  }, [])

  return (
    <div>

      <Skeleton type="block" />

    </div>
  )
}

export default Home