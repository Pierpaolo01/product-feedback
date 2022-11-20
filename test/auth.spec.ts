import {expect} from "chai";
import {prisma} from "@src/prisma";

import {signUp} from "@controllers/auth.controller";
import bcrypt from "bcrypt";

describe("Tests authentication logic", () => {
    it("A user can signup with valid credentials", async (done) => {
        const req = {
            body: {
                username: "username",
                password: "password"
            },
            user: {
                username: "mybigdick",
                password: await bcrypt.hash("password", 10),
                role: "USER",
            }
        }

        const res = {
            statusCode: 0,
            sendData: {},
            status: function(code: number) {
                this.statusCode = code
                return this
            },
            json: function(data: object) {
                this.sendData = data
            }
        } as any

        signUp(req as any, res).then(() => {
            expect(res.statusCode).to.equals(201)
            done();
        })
    })
})
