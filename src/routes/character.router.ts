import express from "express";
import * as characterController from "../controllers/character.controller";

// https://www.coreycleary.me/what-is-the-difference-between-controllers-and-services-in-node-rest-apis/
// https://www.restapitutorial.com/lessons/httpmethods.html

const router: express.Router = express.Router();

router.route("/")
    .get(characterController.getCharacter)
    .post(characterController.createCharacter)

router.route("/:characterId")
    .get(characterController.getCharacter)
    .post(characterController.createCharacter)
    .put(characterController.replaceCharacter)
    .patch(characterController.updateCharacter)
    .delete(characterController.deleteCharacter)


export { router as default };