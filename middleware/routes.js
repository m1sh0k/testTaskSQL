var fs = require('fs');
var path = require('path');
var config = require('../config');
const { Pool, Client } = require('pg');
const client = new Client(config.get('pg'));
const pool = new Pool(config.get('pg'));
var cors = require('cors');




module.exports = function(app) {
    client.connect();
    app.post('/actors',cors(), async (req, res) => {
        console.log('/actors');
        try {
            const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            res.status(201).json({ rows: rows });
            //client.end()
        } catch (err){
            if(err) console.log("routerErr: ", err);
        }
    });
    app.post('/films',cors(), async (req, res) => {
        console.log('/films');
        try {
            const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.film');
            res.status(201).json({ rows: rows });
            //client.end()
        } catch (err){
            if(err) console.log("routerErr: ", err);
        }
    });
    app.post('/addActors',cors(), async (req, res) => {
        console.log('/addActors req.body: ',req.body);
        try {
            let addActors = req.body;
            await client.query(`INSERT INTO actor (first_name, last_name) VALUES ('${addActors.firstName}', '${addActors.lastName}')`);
            const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            console.log("addActors rows: ",rows);
            res.status(201).json({ rows: rows });

        } catch (err){
            if(err) {
                console.log("/addActors: ", err);
                res.status(500).json({ err: err });

            }
        }
    });
    app.post('/deleteActorsByNameAndLastName',cors(), async (req, res) => {
        console.log('/deleteActors req.body: ',req.body);
        try {
            let delActors = req.body;
            await client.query(`DELETE FROM actor WHERE first_name = '${delActors.firstName}' AND last_name = '${delActors.lastName}')`);
            const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            res.status(201).json({ rows: rows });

        } catch (err){
            if(err) {
                console.log("/addActors: ", err);
                res.status(500).json({ err: err });

            }
        }
    });
    app.post('/deleteActorsByIdArray',cors(), async (req, res) => {
        console.log('/deleteActors req.body: ',req.body);
        try {
            let delActorsString = req.body.idArray.join(',');
            console.log("deleteActorsByIdArray delActorsString: ",delActorsString);
            await client.query(`DELETE FROM actor WHERE actor_id IN (${delActorsString})`);
            const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            res.status(201).json({ rows: rows });
        } catch (err){
            if(err) {
                console.log("/addActors: ", err);
                res.status(500).json({ err: err });
            }
        }
    })
};

