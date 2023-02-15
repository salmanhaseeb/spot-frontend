import React, { useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import ApiRequest from "../services/apiRequestService"
import Spinner from "./Spinner"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function CreateFrom() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imagesAttributes, setImagesAttributes] = useState([
    { file: "", primary: true },
  ])

  const navigate = useNavigate()

  const handleImage = (event, index) => {
    setImagesAttributes(
      imagesAttributes.map((v, i) => {
        if (index === i) {
          if (event.target.name === "image" + (index + 1)) {
            return { ...v, file: event.target.files[0] }
          } else {
            return { ...v, primary: event.target.checked ? true : false }
          }
        } else {
          if (v.primary && event.target.name != "image" + (index + 1)) {
            return { ...v, primary: false }
          } else {
            return v
          }
        }
      })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (formValidation()) {
      let formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("price", price)

      imagesAttributes.forEach((image) => {
        if (image.file) {
          formData.append("images_attributes[][file]", image.file)
          formData.append("images_attributes[][primary]", image.primary)
        }
      })
      ApiRequest.create_data("api/v1/spots", formData, true)
        .then(function (response) {
          toast.success("Spot add successfully.")
          navigate("/")
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
    }
  }

  const formValidation = () => {
    if (!title) {
      toast.error("Spot title is required")
      setIsLoading(false)
      return false
    } else if (!description) {
      toast.error("Spot description is required")
      setIsLoading(false)
      return false
    } else if (!price) {
      toast.error("Spot price is required")
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
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <CKEditor
          editor={ClassicEditor}
          data={description}
          onChange={(event, editor) => {
            const data = editor.getData()
            setDescription(data)
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      {imagesAttributes.map((imageAttribute, index) => {
        return (
          <>
            <div className=" row mb-3">
              <label htmlFor={"image" + (index + 1)} className="form-label">
                Image {index + 1}
              </label>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  name={"image" + (index + 1)}
                  id={"image" + (index + 1)}
                  onChange={(e) => {
                    handleImage(e, index)
                  }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="checkbox"
                  name={"primary" + (index + 1)}
                  checked={imageAttribute.primary}
                  onChange={(e) => {
                    handleImage(e, index)
                  }}
                />
                Primary
              </div>
            </div>
          </>
        )
      })}

      <div className="mb-3 float-end">
        <button
          className="btn btn-outline-success"
          onClick={(e) => {
            onSubmit(e)
          }}
        >
          Add Spot
        </button>
        <button
          className="btn btn-outline-info ml-2"
          onClick={(e) => {
            e.preventDefault()
            setImagesAttributes([
              ...imagesAttributes,
              { file: "", primary: false },
            ])
          }}
        >
          Add Image
        </button>
      </div>
    </div>
  )
}

export default CreateFrom
