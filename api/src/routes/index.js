const { Router } = require("express");
const router = Router();
const user = require("./user");
const shelter = require("./shelter");
const network = require("./networks");
const service = require("./service");
const post = require("./post");

router.use("/user", user);
router.use("/shelter", shelter);
router.use("/network", network);
router.use("/service", service);
router.use("/post", post);

module.exports = router;
