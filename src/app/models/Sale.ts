import Model from "config/knex.config"
import moment from "moment"

export class Sale extends Model {
    static tableName = "sale"
    static hidden = ["updated_at"]

    id: number
    sale_id: number
    total_price: number
    payment_received: number
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
