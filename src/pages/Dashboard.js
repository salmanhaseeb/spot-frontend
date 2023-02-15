import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import SpotItem from "../components/spotItem"
import ApiRequest from "../services/apiRequestService"

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [spots, setSpots] = useState([])
  const [sortByPrice, setSortByPrice] = useState("desc")

  useEffect(() => {
    ApiRequest.get_data("api/v1/spots?sort_by_price=" + sortByPrice)
      .then(function (response) {
        setSpots(response.data.spots)
        setIsLoading(false)
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        toast.error(message)
        setIsLoading(false)
      })
  }, [sortByPrice])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="mt-2 mb-2">
        <div className="card text-center">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <h2 className="card-title">Spots</h2>
              </div>
              <div className="col-md-4">
                <select
                  className="form-control float-end"
                  onChange={(e) => {
                    setSortByPrice(e.target.value)
                  }}
                >
                  <option disabled>Sort By Price</option>
                  <option value={"desc"}>Low to High</option>
                  <option value={"asc"}>High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="row">
        {spots.length > 0 ? (
          spots.map((spot) => <SpotItem key={spot.id} spot={spot} />)
        ) : (
          <h3>You have not any Spots</h3>
        )}
      </div>
    </>
  )
}

export default Dashboard
