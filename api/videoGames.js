const express = require('express');
const router = express.Router();

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        const { name, description, price, inStock, isPopular, imgUrl } = req.body;
        const videoGame = await createVideoGame({
            name,
            description,
            price,
            inStock,
            isPopular,
            imgUrl,
        })
        res.status(201).json(videoGame)
    } catch (err) {
        next(err)
    }
});


// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        const fields = req.body
        const videoGame = await updateVideoGame(req.params.id, fields)
        res.json(videoGame)
    } catch (err) {
        next(err)
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try{
        const videoGame = await deleteVideoGame(req.params.id)
        res.json(videoGame)
    }catch(err){
        next(err)
    }
});

module.exports = router;
