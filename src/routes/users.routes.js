const express = require("express");
const controller = require("../controllers/users.controllers");
const hasContentMiddleware = require("../middlewares/hasContent");
const authenticationMiddleware = require("../middlewares/authentication");
const router = express.Router();

router.get("/", controller.listAllUsersnames);
router.get("/:id", authenticationMiddleware, controller.showUserById);
router.post("/create", hasContentMiddleware(["username", "email", "password"]), controller.createUser);
router.post("/login", hasContentMiddleware(["username", "password"]), controller.login);
router.put("/:id", authenticationMiddleware, hasContentMiddleware(["password"]), controller.alterPassword);
router.delete("/:id", authenticationMiddleware, controller.deleteUser);

module.exports = router