import Model from "config/knex.config"
import moment from "moment"

export class Post extends Model {
  static tableName = "post"
  static hidded = ["updated_at"]
  static jsonAttributes = ["name", "description", "details"]

  id: number
  name: { [key: string]: string }
  published: boolean
  description: { [key: string]: string }
  details: {
    id: string
    image: string | null
    mass: number | null
    pure_mass: number | null
    total_mass: number | null
    expiration_date: number | null
    volume: string | null
    published: boolean | null
    capacity: { [key: string]: string } | null
    name: { [key: string]: string } | null
  }[]
  created_at: string
  updated_at: string

  $beforeInsert() {
    this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
  }

  $beforeUpdate() {
    this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
  }
}