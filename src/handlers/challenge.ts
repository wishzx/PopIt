import prisma from "../modules/db";

// the standard is to return an object with data field so that frontend knows what to expect (the query could return an object/list/string/number etc)
// also it's what prisma is expecting when creating an entity

// Get all
export const getChallenges = async (req, res, next) => {
    try {
        const challenges = await prisma.challenge.findMany();
        res.json(challenges);
    } catch (e) {
        next(e);
    }
};

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
