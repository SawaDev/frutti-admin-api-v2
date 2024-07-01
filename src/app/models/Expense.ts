import Model from "config/knex.config"
import moment from "moment"
import { Wallet } from "./Wallet"
import { ExpenseCategory } from "./ExpenseCategory"

export class Expense extends Model {
    static tableName = "expense"
    static hidden = ["updated_at"]
    static jsonAttributes = ["wallet_id", "category_id", "amount"]

    id: number
    wallet_id: number
    category_id: number | null
    amount: number
    comment: string | null
    
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
        wallet: {
            relation: Model.BelongsToOneRelation,
            modelClass: Wallet,
            join: {
                from: 'expense.wallet_id',
                to: 'wallet.id',
            },
        },
        expense_category: {
            relation: Model.HasOneRelation,
            modelClass: ExpenseCategory,
            join: {
                from: 'expense.category_id',
                to: 'expense_category.id',
            },
        },
    };
}
