import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner"
import ApiRequest from "../../services/apiRequestService"
import { Link, useNavigate, useParams } from "react-router-dom"
import CreateReview from "../../components/reviews/form"
import ReviewDelete from "../../components/reviews/delete"
import ReviewEdit from "../../components/reviews/edit"
import propertyImage from "./../../assets/img/property.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import config from "../../config"

function SpotShow() {
  let { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [spot, setSpot] = useState([])
  const [refresh, setRefresh] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    ApiRequest.get_data("api/v1/spots/" + id)
      .then(function (response) {
        setSpot(response.data.spot)
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
  }, [refresh])

  const onDelete = () => {
    ApiRequest.delete_data("api/v1/spots/", spot?.id)
      .then(function (response) {
        setRefresh(!refresh)
        navigate("/")
        toast.success("Spot Delete Successfully.")
      })
      .catch(function (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        toast.error(message)
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div class="card mt-5">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            {spot?.images.length > 0 ? (
              spot?.images.map((image, index) => {
                return (
                  <div
                    class={
                      image.primary ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <img
                      src={config.BASE_URL + image.file}
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                )
              })
            ) : (
              <div class="carousel-item active">
                <img src={propertyImage} class="d-block w-100" alt="..." />
              </div>
            )}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <div class="card-body">
          <h5 class="card-title">
            {spot?.title}{" "}
            <Link to={"/edit/" + spot?.id}>
              <FontAwesomeIcon icon={faEdit} className="text-primary" />{" "}
            </Link>
            <FontAwesomeIcon
              icon={faTrash}
              className="text-danger"
              onClick={() => {
                onDelete()
              }}
            />{" "}
            <span className="float-end"> ${spot?.price}</span>
          </h5>
          <div
            className="card-text "
            dangerouslySetInnerHTML={{ __html: spot?.description }}
          ></div>
        </div>
        <hr />
        <div class="card-body">
          <h3>Review</h3>
          {spot?.reviews.length > 0 ? (
            spot?.reviews.map((review, index) => {
              return (
                <>
                  <hr />
                  <h4 className="m-0">
                    {review.reviewer_name}
                    (
                    <FontAwesomeIcon icon={faStar} className="star-color" />
                    {review.star})
                    <span className="float-end">
                      <ReviewDelete
                        spotID={id}
                        reviewID={review?.id}
                        refresh={() => {
                          setRefresh(!refresh)
                        }}
                      />
                      <ReviewEdit
                        spotID={id}
                        review={review}
                        refresh={() => {
                          setRefresh(!refresh)
                        }}
                      />
                    </span>
                  </h4>

                  <small>
                    {new Date(review.created_at).toLocaleString("en-US")}
                  </small>
                  <p>{review.comment} </p>
                </>
              )
            })
          ) : (
            <p>This Spot have not any reviews yet.</p>
          )}
        </div>
      </div>
      <div className="row mt-3 mb-3 d-flux align-items-center justify-content-center">
        <div className="card col-md-6">
          <h3 className="text-center mt-3">Add Your Review</h3>
          <CreateReview
            spotID={id}
            refresh={() => {
              setRefresh(!refresh)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default SpotShow
