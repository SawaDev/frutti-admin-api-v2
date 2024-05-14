import {I18n} from "i18n"
import path from "path"

/**
 * Создание конфигурации
 */
export const i18n = new I18n()

i18n.configure({
    objectNotation: true,
    locales: ["ru"],
    directory: path.join(__dirname, "../resources/locales")
})

export default i18n

