require("dotenv/config")

const config = {
    development: {
        client: "mysql2",
        version: "5.7",
        jsonDatatype: "JSON",
        charset: "utf8mb4",
        connection: {
            host: process.env.MYSQLDB_HOST,
            port: process.env.MYSQLDB_PORT,
            user: process.env.MYSQLDB_USER,
            password: process.env.MYSQLDB_ROOT_PASSWORD,
            database: process.env.MYSQLDB_DATABASE,
            charset: "utf8mb4",
            typeCast: function (field, next) {
                if (field.type == 'TINY' && field.length == 1) {
                    return (field.string() == '1'); // 1 = true, 0 = false
                }
                return next();
            }
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/database/seeds`
        },
    },

    production: {
        client: "mysql2",
        connection: {
            host: process.env.MYSQLDB_HOST,
            port: process.env.MYSQLDB_PORT,
            user: process.env.MYSQLDB_USER,
            password: process.env.MYSQLDB_ROOT_PASSWORD,
            database: process.env.MYSQLDB_DATABASE,
            typeCast: function (field, next) {
                if (field.type == 'TINY' && field.length == 1) {
                    return (field.string() == '1');
                }
                return next();
            }
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/database/seeds`
        }
    }
}

module.exports = config
