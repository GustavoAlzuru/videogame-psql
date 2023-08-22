const client = require('./client');
const util = require('util');


// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videoGames
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    const { name, description, price, inStock, isPopular, imgUrl } = body;
    try {
        const { rows: [videoGame] } = await client.query(`

            INSERT INTO videogames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, inStock, isPopular, imgUrl]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
            // Extract the fields to be updated from the 'fields' parameter
            const { name, description, price, inStock, isPopular, imgUrl } = fields;

            // Build the SQL query for updating the video game
            const updateQuery = `
                UPDATE videogames
                SET
                    name = COALESCE($1, name),
                    description = COALESCE($2, description),
                    price = COALESCE($3, price),
                    "inStock" = COALESCE($4, "inStock"),
                    "isPopular" = COALESCE($5, "isPopular"),
                    "imgUrl" = COALESCE($6, "imgUrl")
                WHERE id = $7
                RETURNING *;
            `;
    
            // Execute the query, providing the updated field values and the ID
            const { rows: [updatedVideoGame] } = await client.query(updateQuery, [
                name, description, price, inStock, isPopular, imgUrl, id
            ]);
    
            return updatedVideoGame;
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const deleteQuery = `
            DELETE FROM videogames
            WHERE id = $1
            RETURNING *;
        `;

        const { rows: [deletedVideoGame] } = await client.query(deleteQuery, [id]);
        return deletedVideoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}