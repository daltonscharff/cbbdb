import express from "express";
import {
    handleGet,
    handlePost,
    handlePut,
    handlePatch,
    handleDelete
} from "../controllers/character.controller";

// https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis/
// https://www.restapitutorial.com/lessons/httpmethods.html

const router: express.Router = express.Router();

router.route("/")
    .get(handleGet)
    .post(handlePost)

router.route("/:characterId")
    .get(handleGet)
    .post(handlePost)
    .put(handlePut)
    .patch(handlePatch)
    .delete(handleDelete)


export { router as default };