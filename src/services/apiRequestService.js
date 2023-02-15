import { EventEmitter } from "events"
import axios from "axios"
import config from "./../config"
class ApiRequest extends EventEmitter {
  headers = null
  constructor() {
    super()
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  }
  async get_data(end_point) {
    return axios.get(`${config.BASE_URL}/${end_point}`, {
      headers: this.headers,
    })
  }
  async create_data(end_point, params, multiFromData = false) {
    this.headers["Content-Type"] = multiFromData
      ? "multipart/form-data"
      : "application/json"
    return axios.post(`${config.BASE_URL}/${end_point}`, params, {
      headers: this.headers,
    })
  }
  async update_data(end_point, id, params, multiFromData = false) {
    this.headers["Content-Type"] = multiFromData
      ? "multipart/form-data"
      : "application/json"
    return axios.put(`${config.BASE_URL}/${end_point}/${id}`, params, {
      headers: this.headers,
    })
  }
  async delete_data(end_point, id) {
    return axios.delete(`${config.BASE_URL}/${end_point}/${id}`, {
      headers: this.headers,
    })
  }
}

export default new ApiRequest()
