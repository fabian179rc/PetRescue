const { Router } = require("express");
const router = Router();
const user = require("./user");
const shelter = require("./shelter");
const contacts = require("./contact");
const service = require("./service");
const post = require("./post");

router.use("/user", user);
router.use("/shelter", shelter);
router.use("/contacts", contacts);
router.use("/service", service);
router.use("/post", post);

module.exports = router;
