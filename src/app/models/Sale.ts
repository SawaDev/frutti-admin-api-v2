import Model from "config/knex.config"
import moment from "moment"
import { Client } from "./Client"

export class Sale extends Model {
    static tableName = "sale"
    static hidden = ["updated_at"]
    static jsonAttributes = ["sale_id", "total_price", "payment_received", "distribution"]

    id: number
    client_id: number
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

    static relationMappings = {
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: Client,
            join: {
                from: 'transaction.client_id',
                to: 'client.id',
            },
        },
    };
}
