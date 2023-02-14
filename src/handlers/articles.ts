import express from 'express';
import verifyAuthToken from '../middlewares/auth';
import {ProductController} from '../models/articles';

const productsRoutes = (app: express.Application) => {
    app.get("/products", index);
    app.get("/products/:productId", show);
    app.post("/products",verifyAuthToken , create);
};

const productController = new ProductController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // Get All users
        const products = await productController.index();
        res.json({products: [products]});

    } catch (error) {
        res.status(400)
        .json(error);
    }

};

const show = async (
    req: express.Request,
    res: express.Response
) => {
    
    // Request Body
    const productReqId : string = req.params.productId as string;
    
    if(Number.isNaN(parseInt(productReqId))){
        res.status(400)
        .json({error: "Bad Request: Product Id should be a number"});
        return;
    }

    try {
        const productId : number = parseInt(productReqId);

        // Search user
        const foundProduct = await productController.show(productId);

        if(foundProduct != null)
            res.json({product: foundProduct});
        else
            res.json({message: "Product Does not exist"});

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
    let productName : string = req.body.name as string;
    const productPrice : string = req.body.price as string;
    
    if(Number.isNaN(parseInt(productPrice))){
        res.status(400)
        .json({error: "Bad Request: Product Price should be a number"});
        return;
    }

    if( productName == undefined ||
        productName.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Product Name Can't be empty"});
        return;
    }

    productName =  productName.replace(/ /g, "");

    try {
        // Validate as required here
        const actualPrice : number =  parseInt(productPrice);
        
        // Create Product
        const createdProduct = await productController.create(productName, actualPrice);
        res.json({product: createdProduct});

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

export default productsRoutes;