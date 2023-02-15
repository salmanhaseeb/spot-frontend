import { useEffect } from "react"
import CreateFrom from "../../components/CreateForm"

function SpotNew() {
  useEffect(() => {}, [])

  return (
    <>
      <section className="mt-2 mb-2">
        <div className="card text-center">
          <div className="card-body">
            <h2 className="card-title">New Spot</h2>
            <p className="card-text"></p>
          </div>
        </div>
      </section>

      <div className="row">
        <CreateFrom />
      </div>
    </>
  )
}

export default SpotNew
