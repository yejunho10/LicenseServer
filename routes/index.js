const express = require("express");
const path = require("path");

let router = express.Router()

router
    .get("/err/:code", (req, res) => {
        res.render("err.ejs", { code: req.params.code });
    })

    .get("/", (req, res) => {
        res.render("index.ejs");
    })
    .get("/signin", (req, res) => {
        res.render("signin.ejs");
    })
    .get("/signup", (req, res) => {
        res.render("signup.ejs");
    })
    .get("/developers", (req, res) => {
        res.render("developers.ejs");
    })
    .get("/wiki", (req ,res) => {
        res.render("wiki.ejs");
    })
    .get("/dashboard", (req, res) => {
        res.render("dashboard/index.ejs");
    })
    .get("/mypage", (req, res) => {
        res.render("mypage/index.ejs")
    })

module.exports = router