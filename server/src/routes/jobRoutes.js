const express = require("express");
const { searchJobs,analyzeDomains } = require("../controllers/jobController");

const router = express.Router();

router.post("/search", searchJobs);
router.post("/analyze",analyzeDomains );

module.exports = router;

