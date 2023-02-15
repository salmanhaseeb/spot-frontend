import React, { useState } from "react"
import ApiRequest from "../../services/apiRequestService"
import Spinner from "./../Spinner"
import { toast } from "react-toastify"

function ReviewFrom({ spotID, refresh }) {
  const [reviewerName, setReviewerName] = useState("")
  const [comment, setComment] = useState("")
  const [star, setStar] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (formValidation()) {
      let data = {
        spot_id: spotID,
        reviewer_name: reviewerName,
        comment,
        star,
      }
      ApiRequest.create_data("api/v1/spots/" + spotID + "/reviews", data, true)
        .then(function (response) {
          setIsLoading(false)
          setReviewerName("")
          setComment("")
          setStar("")
          toast.success("Thank you for add review.")
          refresh()
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
    }
  }

  const formValidation = () => {
    if (!reviewerName) {
      toast.error("Reviewer Name is required")
      setIsLoading(false)
      return false
    } else if (!comment) {
      toast.error("Review comment is required")
      setIsLoading(false)
      return false
    } else if (!star) {
      toast.error("Review star is required")
      setIsLoading(false)
      return false
    } else {
      return true
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          your Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>
        <input
          type="text"
          name="comment"
          className="form-control"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="star" className="form-label">
          Star
        </label>
        <select
          name="star"
          id="star"
          className="form-control"
          value={star}
          onChange={(e) => setStar(e.target.value)}
        >
          <option value={""}>Please select star</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <div className="form-group mb-3 float-end">
        <button
          className="btn btn-outline-success"
          onClick={(e) => {
            onSubmit(e)
          }}
        >
          Add Review
        </button>
      </div>
    </div>
  )
}

export default ReviewFrom
