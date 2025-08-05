import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homePage.ejs", { data: JSON.stringify(data) });
    } catch (error) {
        console.log(error);
    }


}
let getAboutPage = (req, res) => {
    return res.render("aboutPage.ejs");
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createUser(req.body);
    return res.send("post crud from server");
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        datatable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            data: userData
        });
    }
    else {
        return res.send("User not found!");
    }

}
let putCRUD = async (req, res) => {
    let data = req.body;
    console.log(data);
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        datatable: allUsers
    });
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}