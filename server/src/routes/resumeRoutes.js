const express = require("express");

const { parseResume } = require("../controllers/resumeController");

const router = express.Router();

router.post("/parse", parseResume);
module.exports = router;