const express = require("express");
const mail = require("../../modules/mail.js");
const loginController = require("../../modules/loginController.js");
const db = require("../../modules/database");

let router = express.Router();

router
    .get("/", (req, res) => {
        res.status(403).redirect("/err/403");
    })

    .post("/signin", async (req, res) => {
        let result = await loginController.SignIn(req, res);

        if (result.code !== 100) {
            res.status(200).redirect("/");
        } else {
            res.status(400).send(result.msg);
        }
    })
    .get("/logout", async (req, res) => {
        res.clearCookie("userId");
        res.clearCookie("username");

        res.redirect("/");
    })
    .post("/signup", async (req, res) => {
        let result = await loginController.SignUp(req, res);

        if (result.code === 100) {
            if (result.msg === "This email is already taken.") {
                res.send("This email is already taken.");
            } else {
                res.status(500).redirect("/err/" + res.statusCode);
            }
        } else {
            let data = result.data;
            let verifyCode = await mail.sendVerifyCode(data["email"], data["userId"]);

            await db.updateUserByUserId(result.data["userId"], { verifyCode: verifyCode });

            res.status(200).redirect("/signin?signup=true");
        }
    })
    .get("/verify/:userId/:code", async (req, res) => {
        let userId = req.params.userId;
        let code = req.params.code;
        let user = await db.getUserByUserId(userId);

        if (user === null) {
            res.status(400).send("User not found.");
            return;
        }

        let data = JSON.parse(JSON.stringify(user));
        if (data["isMailVerified"] === true) {
            res.status(400).send("Already verified.");
            return;
        }

        if (code === data["verifyCode"]) {
            await db.updateUserByUserId(userId, { isMailVerified: true });
            await db.updateUserByUserId(userId, { verifyCode: null });
            res.status(200).redirect("/signin?verify=true");
            return;
        }

        res.status(400).send("Verify code is incorrect.");
    })

module.exports = router;