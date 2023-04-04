import prisma from "../modules/db";



// protected

export const createLike = async (req, res, next) => {
    try {
        const like = await prisma.likes.create({
            data: {
                user_id: req.user.id,
                content_id: req.body.content_id,
            },
        });
        // batch this with a node cron job or send it to a queue
        await increaseLike(req.body.content_id, 1);
        res.json({ like });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

export const removeLike = async (req, res, next) => {
    try {
        const like = await prisma.likes.delete({
            where: {
                user_id_content_id: {
                    user_id: req.user.id,
                    content_id: req.body.content_id,
                },
            },
        });
        await decreaseLike(req.body.content_id, 1);
        res.json({ like });
    } catch (e) {
        console.error(e);
        next(e);
    }
};

export const increaseLike = async (content_id: string, count: number) => {
    await prisma.content.update({
        where: { id: content_id },
        data: { likes: { increment: count } },
    });
};

export const decreaseLike = async (content_id: string, count: number) => {
    await prisma.content.update({
        where: { id: content_id },
        data: { likes: { decrement: count } },
    });
};

export const getUserLikes = async (id: string) => {
    // BRUH ... denormalization.jpg
    /* const likes = await prisma.likes.findMany({
        where: {
            user_id: id,
        },
        select: { content_id: true },
    });
    return Object.values(likes); */
    const user = await prisma.user.findUnique({
        where: { id: id },

        select: { likes: { select: { content_id: true } } },
    });

    // BAD
    const likeList = user.likes.map((l) => {
        return l.content_id;
    });
    return likeList;
};