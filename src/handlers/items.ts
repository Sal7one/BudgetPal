import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/auth';
import { ItemController } from '../models/items';
import { Categories } from '../utils/constatns';

const itemControllerRoutes = (app: express.Application) => {
    app.get("/items",verifyAuthToken, index);
    app.post("/items",verifyAuthToken, create);
};

const itemController = new ItemController();

const index = async (
    req: express.Request,
    res: express.Response
) => {

    const token = req.query.token as JwtPayload;

    if(
        token == undefined
        ){
        res.status(500)
        .json({error: "Server Error: This one is on us"});
        return;
    }
    
    let userId = token.user.id;

    if(Number.isNaN(parseInt(userId))){
        res.status(400)
        .json({error: "Bad Request: User Id should be a number"});
        return;
    }

    try {
        // Get All Items
        const actualuserId: number =  parseInt(userId);
        const items = await itemController.index(actualuserId);
        res.json({
            items: [items]
        });

    } catch (error) {
        res.status(400)
        .json(error);
    }

};

const create = async (
    req: express.Request,
    res: express.Response
) => {

    // Request Body
    let itemName : string = req.body.name as string;
    let category : string = req.body.category as string;
    const itemPrice : string = req.body.name as string;
    const userId : string = req.body.price as string;
    
    
    if(Number.isNaN(parseInt(itemPrice))){
        res.status(400)
        .json({error: "Bad Request: Item Price should be a number"});
        return;
    }

    if(Number.isNaN(parseInt(userId))){
        res.status(400)
        .json({error: "Bad Request: user Id should be a number"});
        return;
    }

    if( itemName == undefined ||
        itemName.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Item name Can't be empty"});
        return;
    }

    itemName =  itemName.replace(/ /g, "");

    if( category == undefined ||
        category.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: category  Can't be empty"});
        return;
    }

    category =  category.replace(/ /g, "");

    const actualCategoryId : number =  Categories.indexOf(category.toLowerCase());

    if(actualCategoryId < 1 || actualCategoryId > 9){
        res.status(400)
        .json({error: "Bad Request: category Id should be a number"});
        return;
    }

    try {
        // Validate as required here
        const actualItemPrice : number =  parseInt(itemPrice);
        const actualUserId : number =  parseInt(userId);
        
        // Create Item
        const createdItem = await itemController.create(
            itemName,
            actualItemPrice, 
            actualUserId,
            actualCategoryId
            );

        res.json({item: createdItem});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

export default itemControllerRoutes;