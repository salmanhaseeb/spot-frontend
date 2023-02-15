import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner"
import EditFrom from "../../components/EditFrom"

function SpotEdit() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {}, [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="mt-2 mb-2">
        <div className="card text-center">
          <div className="card-body">
            <h2 className="card-title">Edit Spot</h2>
            <p className="card-text"></p>
          </div>
        </div>
      </section>

      <div className="row">
        <EditFrom />
      </div>
    </>
  )
}

export default SpotEdit
