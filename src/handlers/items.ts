import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import verifyAuthToken from '../middlewares/auth';
import { ItemController } from '../models/items';
import { Categories } from '../utils/constatns';

const itemControllerRoutes = (app: express.Application) => {
    app.get("/items",verifyAuthToken, index);
    app.post("/items",verifyAuthToken, create);
    app.delete("/items/:id", verifyAuthToken, removeItem);
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
        const items = await itemController.index(userId);
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
    let itemName : string = req.body.itemName as string;
    let category : string = req.body.category as string;
    const itemPrice : string = req.body.price as string;    
    
    if(Number.isNaN(parseInt(itemPrice))){
        res.status(400)
        .json({error: "Bad Request: Item Price should be a number"});
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
        .json({error: "Bad Request: category Id not correct"});
        return;
    }

    const token = req.query.token as JwtPayload;

    if(
        token == undefined
        ){
        res.status(500)
        .json({error: "Server Error: This one is on us"});
        return;
    }
    
    const userId : number = token.user.id;

    try {
        // Validate as required here
        const actualItemPrice : number =  parseFloat(itemPrice);
        
        // Create Item
        const createdItem = await itemController.create(
            itemName,
            actualItemPrice, 
            userId,
            actualCategoryId
            );

        res.json({item: createdItem});

    } catch (error) {
        res.status(400)
        .json(error);
    }

};
const removeItem = async (
        req: express.Request,
        res: express.Response
    ) => {
    
        const itemId : string = req.params.id as string;    

        if(Number.isNaN(parseInt(itemId))){
            res.status(400)
            .json({error: "Bad Request: Item should be a number"});
            return;
        }
    
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
            const actualitemId = parseInt(itemId);
            const itemRemoved = await itemController.remove(actualitemId, userId);
            if(itemRemoved)
            res
                .status(200)
                .json({
                    "message": "item removed"
                });
            else
                res
                .status(404)
                .json({
                    "message": "Item Not Found"
                });
        
        } catch (error) {
            res.status(400)
            .json(error);
        }
    
};

export default itemControllerRoutes;