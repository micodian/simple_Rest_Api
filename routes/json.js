const express = require("express");
const router = express.Router();


router.get("/", (req, res) =>{
    const data ="Hello Json";
    res.json({ "message": data });

});


module.exports = router;