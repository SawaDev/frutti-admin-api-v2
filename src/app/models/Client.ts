import Model from "config/knex.config"
import moment from "moment"

export class Client extends Model {
    static tableName = "client"
    static hidden = ["updated_at"]
    static jsonAttributes = ["balance"]

    id: number
    name: string
    balance: number
    
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
