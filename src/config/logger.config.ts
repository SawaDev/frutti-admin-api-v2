import {createLogger, format, transports} from "winston"
// Форматы
const {combine, timestamp, prettyPrint} = format

// Создания лога
export const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        prettyPrint()
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: "logs/error.log", level: "error"})
    ]
})

export default {
    app: logger
}
