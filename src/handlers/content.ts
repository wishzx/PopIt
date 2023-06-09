import prisma from "../modules/db";

//add indexes of things you use where
// because doing manipulation in memory is not good so go back change the schema
// and migrate the db instead

// protected

// Create
export const createContentbyUser = async (req, res, next) => {
    try {
        const content = await prisma.content.create({
            data: {
                image_url: req.body.image_url,
                challenge_id: req.params.id,
                user_id: req.user.id,
            },
        });
        res.json(content);
    } catch (e) {
        console.error(e);
        next(e);
    }
};

// admin

// Get all
export const getContent = async (req, res, next) => {
    try {
        const contents = await prisma.content.findMany({
            select: {
                id: true,
            },
        });
        res.json(contents);
    } catch (e) {
        next(e);
    }
};

// Get one
export const getOneContent = async (req, res, next) => {
    try {
        const content = await prisma.content.findUnique({
            where: { id: req.params.id },
        });
        res.json(content);
    } catch (e) {
        next(e);
    }
};
// Create
export const createContent = async (req, res, next) => {
    try {
        const content = await prisma.content.create({
            data: {
                image_url: req.body.image_url,
                challenge_id: req.body.challenge_id,
                user_id: req.body.user_id,
            },
        });
        res.json(content);
    } catch (e) {
        next(e);
    }
};

// Update
export const updateContent = async (req, res, next) => {
    try {
        const content = await prisma.content.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });
        res.json(content);
    } catch (e) {
        next(e);
    }
};

// Delete
// if you need to use a combination of fields to do findUnique(which delete uses behind the scene) you must create an new index in the schema and migrate
export const deleteContent = async (req, res, next) => {
    try {
        const content = await prisma.content.delete({
            where: {
                id: req.params.id,
            },
        });
        res.json(content);
    } catch (e) {
        next(e);
    }
};
