import React from "react"
import ApiRequest from "../../services/apiRequestService"
import { toast } from "react-toastify"

function ReviewDelete({ spotID, reviewID, refresh }) {
  const onDelete = (e) => {
    e.preventDefault()
    ApiRequest.delete_data("api/v1/spots/" + spotID + "/reviews", reviewID)
      .then(function (response) {
        refresh()
        toast.success("Your Review Delete Successfully.")
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

  return (
    <>
      <button
        className="btn btn-outline-danger btn-sm "
        onClick={(e) => {
          onDelete(e)
        }}
      >
        Delete
      </button>
    </>
  )
}

export default ReviewDelete
