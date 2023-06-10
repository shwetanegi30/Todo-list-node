const express = require('express');
const Router = express.Router();

const List = require("../models/list.model");
const mongoose = require("mongoose");

const date = require("../utils/date");

Router.get("/", async function (req, res) {
    try {
        if (!req.isAuthenticated()) {
            req.session.returnTo = '/list'
            res.render("login");
            return;
        }
        let day = date.getDate();
        let user = req.session?.passport?.user;

        // console.log(user._id);

        if (!user) {
            user = {
                _id: "648411c4e8fe62d65d7c5fe5",
            }
        }
        let items = await List.find({ user: user._id, isDeleted: false });
        items = items.map(each => each.item)

        res.render("list", { listTitle: day, newListItem: items });
    } catch (err) {
        console.log(err)
        throw new Error('Unable to fetch list');
    }
})

Router.post("/", async function (req, res) {
    try {
        if (!req.isAuthenticated()) {
            req.session.returnTo = '/list'
            res.render("login");
            return;
        }

        let newItem = req.body.newItem;
        let user = req.session?.passport?.user;
        if (!user) {
            user = {
                _id: "648411c4e8fe62d65d7c5fe5",
            }
        }

        if (!newItem) {
            throw new Error("newItem is not present");
        }
        let item = new List({
            _id: new mongoose.Types.ObjectId(),
            item: newItem,
            isDeleted: false,
            isCompleted: false,
            createAtDate: new Date(),
            user: user._id
        })
        await item.save();
        res.redirect('/list');
    } catch (err) {
        console.log(err);
        throw new Error('Unable to create list item');
    }

})

module.exports = Router
