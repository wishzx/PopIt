import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
    it("should send back some data", async () => {
        const res = await supertest(app).get("/");
        expect(res.body.message).toBe("hello");
    });
});
//backend
// mostly unit and integration

// do frontend
//expand on snapshotting ,end to end , unit, diffing ??
