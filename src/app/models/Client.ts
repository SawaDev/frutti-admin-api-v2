import Model from "config/knex.config"
import moment from "moment"

export class Client extends Model {
    static tableName = "clients"
    static hidden = ["updated_at"]
    static jsonAttributes = ["terminal_ids"]

    id: number
    full_name: string | null
    phone: string
    date_of_birth: string | null
    terminal_ids: string[] | null
    city_id: string | null
    lang: "uz" | "ru"
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
