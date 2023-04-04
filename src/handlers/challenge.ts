import prisma from "../modules/db";
import localCache from "../modules/cache";

// the standard is to return an object with data field so that frontend knows what to expect (the query could return an object/list/string/number etc)
// also it's what prisma is expecting when creating an entity

export const maxLikes = async (id: string) => {
    try {
        let max = localCache.get("likes-" + id);
        if (max !== undefined) {
            return max;
        }
        max = await prisma.content.findMany({
            where: { challenge_id: id },
            orderBy: { likes: "desc" },
            take: 1,
            select: { likes: true },
        });
        max = max[0].likes || 0;
        localCache.set("likes-" + id, max);
        return max;
    } catch (error) {
        return 0;
    }
};

// protected

// Get all
export const getChallenges = async (req, res, next) => {
    try {
        const challenges = await prisma.challenge.findMany({
            select: { id: true, name: true },
        });
        res.json(challenges);
    } catch (e) {
        next(e);
    }
};

export const getChallengeFromUser = async (req, res, next) => {
    try {
        const challenge = await prisma.challenge.findMany({
            where: { id: req.params.id },
            include: {
                content: {
                    where: {
                        user_id: req.user.id,
                    },
                    orderBy: { likes: "desc" },
                    select: {
                        image_url: true,
                        likes: true,
                    },
                    take: 1,
                },
            },
        });
        const like = await maxLikes(req.params.id);
        challenge[0]["maxLike"] = like;
        res.json(challenge);
    } catch (e) {
        next(e);
    }
};

// admin

// Get one
export const getOneChallenge = async (req, res, next) => {
    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id: req.params.id },
        });
        res.json(challenge);
    } catch (e) {
        next(e);
    }
};

// Create
export const createChallenge = async (req, res, next) => {
    try {
        const challenge = await prisma.challenge.create({
            data: {
                name: req.body.name,
                tags: req.body.tags,
                content: req.body.content,
            },
        });
        res.json(challenge);
    } catch (e) {
        next(e);
    }
};

// Update
export const updateChallenge = async (req, res, next) => {
    try {
        const challenge = await prisma.challenge.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });
        res.json(challenge);
    } catch (e) {
        next(e);
    }
};

// Delete
// if you need to use a combination of fields to do findUnique(which delete uses behind the scene) you must create an new index in the schema and migrate
export const deleteChallenge = async (req, res, next) => {
    try {
        const challenge = await prisma.challenge.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json(challenge);
    } catch (e) {
        next(e);
    }
};
