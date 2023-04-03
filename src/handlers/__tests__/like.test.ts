import prisma from "../../modules/db";
import * as like from "../like";

// use a local database for testing
// delete db before every test , every test must be stateless and not reliant to another test
/* describe("test likes", () => {
    it("should increase like by 1", async () => {
        const req = { body: { content_id: "1" }, user: { id: "1" } };
        const preLikes = await prisma.content.findUnique({
            where: { id: req.body.content_id },
            select: { likes: true },
        });
        console.log(preLikes);

        const mockResponse = () => {
            const res = { status: () => res, json: () => res };
            // replace the following () => res
            // with your function stub/mock of choice
            // making sure they still return `res`

            res.status = () => res;
            res.json = () => res;
            return res;
        };// FIX res.json is not a function

        await like.createLike(req, mockResponse, () => {});

        const postLikes = await prisma.content.findUnique({
            where: { id: req.body.content_id },
            select: { likes: true },
        });

        expect(preLikes.likes + 1).toBe(postLikes.likes);
    });
});
 */
