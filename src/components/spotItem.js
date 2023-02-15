import config from "../config"
import propertyImage from "./../assets/img/property.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function SpotItem({ spot }) {
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 100) + "..." : str
  }
  return (
    <>
      <div class="col-sm-4">
        <div class="card">
          <img
            src={
              spot?.images.length > 0
                ? config.BASE_URL + spot?.images[0]?.file
                : propertyImage
            }
            className="card-img-top"
            alt="..."
            height="240px"
          />
          <div className="card-body">
            <h5 className="card-title">
              <Link to={"/" + spot?.id}>{spot?.title}</Link>
            </h5>
            <div
              className="card-text height-50px"
              dangerouslySetInnerHTML={{ __html: truncate(spot?.description) }}
            ></div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {" "}
              ${spot?.price}{" "}
              <span className="float-end">
                <FontAwesomeIcon icon={faStar} className="star-color" />
                {/* <i class="fa-solid fa-user"></i> */}
                {spot?.average_review_star ? spot?.average_review_star : 0}(
                {spot?.review_count})
              </span>{" "}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default SpotItem
