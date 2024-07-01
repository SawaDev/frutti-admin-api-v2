import Model from "config/knex.config"
import moment from "moment"

export class ExpenseCategory extends Model {
    static tableName = "expense_category"
    static hidden = ["updated_at"]

    id: number
    name: string
    
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
