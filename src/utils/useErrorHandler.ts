/**
 * Отслеживание ошибок в контроллерах
 * @param fn
 */
export const useErrorHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)
