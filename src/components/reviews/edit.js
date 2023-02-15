import React, { useEffect, useState } from "react"
import ApiRequest from "../../services/apiRequestService"
import { toast } from "react-toastify"

function ReviewEdit({ spotID, review, refresh }) {
  const [reviewerName, setReviewerName] = useState("")
  const [comment, setComment] = useState("")
  const [star, setStar] = useState("")

  useEffect(() => {
    setReviewerName(review?.reviewer_name)
    setComment(review?.comment)
    setStar(review?.star)
  }, [review])

  const OnEdit = (e) => {
    e.preventDefault()
    if (formValidation()) {
      let data = {
        reviewer_name: reviewerName,
        comment,
        star,
      }
      ApiRequest.update_data(
        "api/v1/spots/" + spotID + "/reviews",
        review.id,
        data
      )
        .then(function (response) {
          toast.success("Your Review Update Successfully.")
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
        })
    }
  }
  const formValidation = () => {
    if (!reviewerName) {
      toast.error("Reviewer Name is required")
      return false
    } else if (!comment) {
      toast.error("Review comment is required")
      return false
    } else if (!star) {
      toast.error("Review star is required")
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <button
        type="button"
        class="btn btn-outline-info btn-sm"
        data-bs-toggle="modal"
        data-bs-target={"#edit" + review?.id}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={"edit" + review?.id}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby={"editlabel" + review?.id}
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id={"editlabel" + review?.id}>
                Edit Review
              </h5>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={(e) => {
                  OnEdit(e)
                }}
                data-bs-dismiss="modal"
                class="btn btn-outline-primary btn-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewEdit
