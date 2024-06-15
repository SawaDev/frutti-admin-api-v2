import Model from "config/knex.config"
import moment from "moment"

export class Wallet extends Model {
    static tableName = "wallet"
    static hidden = ["updated_at"]

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
