import express from "express";

const router: express.Router = express.Router();

router.route("/").get((req: express.Request, res: express.Response): void => {
    res.send({ response: "Hello from episodes" });
});
router.route("/").post();
router.route("/").put();
router.route("/").delete();

export { router as default };