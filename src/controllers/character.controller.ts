import { Request, Response, NextFunction } from "express";
import Character from "../models/character.model";
import mongoose from "mongoose";

async function handleGet(req: Request, res: Response, next: NextFunction): Promise<void> {
    const characterId: string = req.params.characterId;
    if (characterId) {
        let character;
        if (mongoose.Types.ObjectId.isValid(characterId)) {
            character = await Character.find({ _id: characterId });
        }
        if (character) {
            res.send(character);
        } else {
            res.status(404).send();
        }
        res.send();
    } else {
        res.send(await Character.find({}));
    }
    next();
}

async function handlePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(["post"]);
    next();
}

async function handlePut(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(["put"]);
    next();
}

async function handlePatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(["patch"]);
    next();
}

async function handleDelete(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send(["delete"]);
    next();
}

export { handleGet, handlePost, handlePut, handlePatch, handleDelete };