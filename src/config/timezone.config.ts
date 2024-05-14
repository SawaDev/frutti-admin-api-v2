import moment from "moment-timezone"

export function setTimezone(req, res, next) {
    res.setHeader('Timezone-Offset', moment().utcOffset());
    moment.tz.setDefault("Asia/Tashkent")
    next()
}
