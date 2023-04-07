import localCache from "../modules/cache";
import prisma from "../modules/db";

export const feed = async (req, res, next) => {
    try {
        let feed = localCache.get("feed");
        if (feed !== undefined) {
            res.json(feed);
            return;
        }

        feed = await prisma.content.findMany({
            take: 100,
            select: {
                image_url: true,
                likes: true,
                id: true,
                challenge: { select: { tags: true, name: true } },
                user: { select: { instagram_uname: true } },
                message: true,
            },

            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(feed);
        localCache.set("feed", feed);
    } catch (e) {
        next(e);
    }
};
