import * as auth from "../auth";
import { User } from "@prisma/client";
import { create } from "domain";
import jwt from "jsonwebtoken";

describe("auth library", () => {
    it(`should be able to hash the password: 123 and
    then compare successfully with the hash`, async () => {
        const password = "123";
        const hash = await auth.hashPassword(password);
        const comparison = await auth.comparePasswords(password, hash);
        expect(comparison).toBeTruthy();
    });
});
