const express = require("express");
const controller = require("../controllers/users.controllers");
const hasContentMiddleware = require("../middlewares/hasContent");
const router = express.Router();

router.get("/", controller.listAllUsersnames);
router.get("/:id", controller.showUserById);
router.post("/create", hasContentMiddleware(['username', 'email', 'password']), controller.createUser);
router.post("/login", hasContentMiddleware(['username', 'password']), controller.login);
router.put("/:id", controller.alterUser);
router.delete("/:id", controller.deleteUser);

module.exports = router