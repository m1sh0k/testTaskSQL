const fs = require('fs');
const path = require('path');
const config = require('../config');
const { Pool, Client } = require('pg');
const client = new Client(config.get('pg'));
const pool = new Pool(config.get('pg'));
const cors = require('cors');
//const sequelize = require('./db/sequelize');
const Actor = require('./db/sequelize').Actor;
const Film = require('./db/sequelize').Film;
//const User = require('./db/sequelize').User;





module.exports = function(app) {
    client.connect();
    app.post('/actors',cors(), async (req, res) => {
        console.log('/actors');
        try {
            //const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            let rows = await Actor.findAll({raw:true});
            res.status(201).json({ rows: rows });
        } catch (err){
            if(err) console.log("routerErr: ", err);
        }
    });
    app.post('/films',cors(), async (req, res) => {
        console.log('/films');
        try {
            //const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.film');
            let rows = await Film.findAll({raw:true});
            res.status(201).json({ rows: rows });
        } catch (err){
            if(err) console.log("routerErr: ", err);
        }
    });
    app.post('/addActors',cors(), async (req, res) => {
        console.log('/addActors req.body: ',req.body);
        try {
            let addActors = req.body;
            //await client.query(`INSERT INTO actor (first_name, last_name) VALUES ('${addActors.firstName}', '${addActors.lastName}')`);
            //const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            await Actor.create({ first_name: addActors.firstName, last_name: addActors.lastName });
            let rows = await Actor.findAll({raw:true});
            //console.log("addActors rows: ",rows);
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
            //await client.query(`DELETE FROM actor WHERE first_name = '${delActors.firstName}' AND last_name = '${delActors.lastName}')`);
            //const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            await Actor.destroy({
                where: {
                    first_name: delActors.firstName,
                    last_name: delActors.lastName
                }
            });
            let rows = await Actor.findAll({raw:true});
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
            //let delActorsString = req.body.idArray.join(',');
            //console.log("deleteActorsByIdArray delActorsString: ",delActorsString);
            //await client.query(`DELETE FROM actor WHERE actor_id IN (${delActorsString})`);
            //const { command,rowCount,oid,rows,fields } = await client.query('SELECT * FROM public.actor');
            await Actor.destroy({
                where: {
                    actor_id: req.body.idArray,
                }
            });
            let rows = await Actor.findAll({raw:true});
            res.status(201).json({ rows: rows });
        } catch (err){
            if(err) {
                console.log("/addActors: ", err);
                res.status(500).json({ err: err });
            }
        }
    });
    // app.get('/sequelize',cors(), async (req, res) => {
    //     console.log('/sequelize: ');
    //     try {
    //         await Actor.create({ first_name: "Nika", last_name: "Kushch" });
    //         let actor = await Actor.findAll({raw:true});
    //         console.log("actor: ",actor);
    //         res.status(201).json({ actor: actor });
    //     } catch (err){
    //         if(err) {
    //             console.log("/sequelize err: ", err);
    //             res.status(500).json({ err: err });
    //         }
    //     }
    // })

};

