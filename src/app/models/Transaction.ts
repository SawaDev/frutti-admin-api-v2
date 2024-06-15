import Model from "config/knex.config"
import moment from "moment"

export class Transaction extends Model {
    static tableName = "transaction"
    static hidden = ["updated_at"]

    id: number
    wallet_id: number
    sale_id: number | null
    client_id: number | null
    type: "cash" | "card"
    amount: number
    distribution: number | null
    currency_name: string | null
    
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
