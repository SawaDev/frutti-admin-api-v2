import Model from "config/knex.config"
import moment from "moment"
import { Sale } from "./Sale"
import { Client } from "./Client"
import { Wallet } from "./Wallet"

export class Transaction extends Model {
    static tableName = "transaction"
    static hidden = ["updated_at"]
    static jsonAttributes = ["wallet_id", "sale_id", "client_id", "amount", "distribution"]

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

    static relationMappings = {
        sale: {
            relation: Model.BelongsToOneRelation,
            modelClass: Sale,
            join: {
                from: 'transaction.sale_id',
                to: 'sale.id',
            },
        },
        wallet: {
            relation: Model.BelongsToOneRelation,
            modelClass: Wallet,
            join: {
                from: 'transaction.wallet_id',
                to: 'wallet.id',
            },
        },
        client: {
            relation: Model.HasOneRelation,
            modelClass: Client,
            join: {
                from: 'transaction.client_id',
                to: 'client.id',
            },
        },
    };
}
