const express = require("express")

router = express.Router()

router
    .get("/", (req, res) => {
        const context = {
            products: [
                { product_id: "test1", title: "test1", thumbnail_path: "../../public/assets/img/logo-transparent.png", tag: "test1", price: "1" }, // using forEach
                { product_id: "test2", title: "test2", thumbnail_path: "../../public/assets/img/logo-transparent.png", tag: "test2", price: "2" },
                { product_id: "test3", title: "test3", thumbnail_path: "../../public/assets/img/logo-transparent.png", tag: "test3", price: "3" }
            ],
            product_count: 3,
        }

        res.render("store/product_list.ejs", context, (err, html) => {
            if (err) {
                res.status(404).redirect("/err/" + res.statusCode)
                res.status(500).redirect("/err/" + res.statusCode)
            }

            res.send(html)
        })
    })
    .get("/detail", (req, res) => {
        const id = req.query.id
        const context = {
            product_title: "",
            tag: "",
            description: "",
            price: "",
            img_1_path: "",
            img_2_path: "",
            img_3_path: "",
            img_4_path: "",
            img_5_path: ""
        }

        res.end(id + " -> detail page!")

        res.render("store/product_detail.ejs", context, (err, html) => {
            if (err) {
                res.status(404).redirect("/err/" + res.statusCode)
                res.status(500).redirect("/err/" + res.statusCode)
            }

            res.send(html)
        })
    })

module.exports = router