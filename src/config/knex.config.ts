import knex from "knex"
import {Model} from "objection"
import knexFile from "../../knexfile"

export const knexConfig = knex(knexFile["development"])
export const knexModel = Model.knex(knexConfig)

export default Model
