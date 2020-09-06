import { Request, Response, NextFunction } from "express";

function getCharacter(req: Request, res: Response, next: NextFunction): void {
    res.send(["get"]);
    next();
}

function createCharacter(req: Request, res: Response, next: NextFunction): void {
    res.send(["post"]);
    next();
}

function replaceCharacter(req: Request, res: Response, next: NextFunction): void {
    res.send(["put"]);
    next();
}

function updateCharacter(req: Request, res: Response, next: NextFunction): void {
    res.send(["patch"]);
    next();
}

function deleteCharacter(req: Request, res: Response, next: NextFunction): void {
    res.send(["delete"]);
    next();
}

export { getCharacter, createCharacter, replaceCharacter, updateCharacter, deleteCharacter };