import express from 'express';
import {ArticleController} from '../models/articles';

const articleRoutes = (app: express.Application) => {
    app.get("/articles", index);
    app.post("/articles", create);
};

const articleController = new ArticleController();

const index = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        // Get All Articles
        const articles = await articleController.index();
        res.status(200)
        .json({articles: articles});

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
    let articleTitle : string = req.body.articleTitle as string;
    let articleBody : string = req.body.articleBody as string;
    let articleImage : string = req.body.articleImage as string || "";

    if( articleTitle == undefined ||
        articleTitle.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Article Title  Can't be empty"});
        return;
    }

    if( articleBody == undefined ||
        articleBody.replace(/ /g, "").length == 0 
    ){
        res.status(400)
        .json({error: "Bad Request: Article Body  Can't be empty"});
        return;
    }

    articleTitle =  articleTitle.replace(/ /g, "");
    articleBody =  articleBody.replace(/ /g, "");

    try {
        // Create Article
        const createdArticle = await articleController.create(
            articleTitle, 
            articleBody,
            articleImage
            );
            res.status(200)
            .json({
            article: createdArticle
        });

    } catch (error) {
        res.status(400)
        .json(error);
    }
};

export default articleRoutes;