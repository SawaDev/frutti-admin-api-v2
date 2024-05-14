import Model from "config/knex.config"
import moment from "moment"
import Password from "objection-password"

export class User extends Model {
    static tableName = "user"
    static hidden = ["password"]
    static jsonAttributes = ["permissions"]

    id: number
    user_name: string
    permissions: string[]
    password?: string
    created_at: string
    updated_at: string

    static get modifiers() {
        return {
            /**
             * Search
             * @param builder
             * @param search
             */
            search(builder, search) {
                if (search.trim() !== "")
                    builder.where((_builder) => {
                        _builder.where("id", "LIKE", `%${search}%`)
                            .orWhere("user_name", "LIKE", `%${search}%`)
                    })
            }
        }
    }

    $beforeInsert() {
        this.created_at = moment().format("YYYY-MM-DD HH:mm:ss")
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }

    $beforeUpdate() {
        this.updated_at = moment().format("YYYY-MM-DD HH:mm:ss")
    }
}

export const UserPassword = Password()(User)
