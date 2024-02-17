const express = require("express");
const controller = require("../controllers/users.controllers");
const router = express.Router();

router.get("/", controller.listAllUsersNames);
router.get("/:id", controller.showUserById);
router.post("/create", controller.createUser);
router.put("/:id", controller.alterUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;