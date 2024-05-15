import request from "supertest"
import app from ".."

describe("routes API", () => {
    // Проверка городов
    test("should return 200 & list cities", done => {
        request(app)
            .get(`/api/cities`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.status).toBe("success")
                expect(Array.isArray(res.body.cities)).toBe(true)
                expect(res.body.cities[0]).toMatchObject({
                    id: expect.anything(),
                    title: expect.anything()
                })
                done()
            })
    })

    // Проверка филиалов по городу
    test("should return 200 & list terminals", done => {
        request(app)
            .get(`/api/city/41d99206-638b-47b9-8338-95892c28ac41/terminals`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.status).toBe("success")
                expect(Array.isArray(res.body.terminals)).toBe(true)
                expect(res.body.terminals[0]).toMatchObject({
                    id: expect.anything(),
                    title: expect.anything(),
                    address: expect.anything(),
                    zone: expect.anything()
                })
                done()
            })
    })

    // Проверка авторизации отправка номера телефона
    test("should return 200 & send phone", done => {
        request(app)
            .post(`/api/send-phone`)
            .send({phone: "998903192933"})
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                console.log(res.body)
                done()
            })
    })
})
