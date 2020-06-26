/**
 * Created by Mishok on 25.06.2020.
 */
const Sequelize = require('sequelize');
const config = require('../../config');
let pgConf = config.get('pg');
const sequelize = new Sequelize(pgConf.database,pgConf.username, pgConf.password, {
    host: 'localhost',
    dialect: 'postgres',
});

const Actor = sequelize.define('actor', {
    actor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    last_update: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'actor'
});

const Film = sequelize.define('film', {
        film_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        release_year: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        language_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'language',
                key: 'language_id'
            }
        },
        rental_duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '3'
        },
        rental_rate: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '4.99'
        },
        length: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        replacement_cost: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '19.99'
        },
        rating: {
            type: Sequelize.ENUM("G","PG","PG-13","R","NC-17"),
            allowNull: true,
            defaultValue: 'G'
        },
        last_update: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        special_features: {
            type: "ARRAY",
            allowNull: true
        },
        fulltext: {
            type: "TSVECTOR",
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        tableName: 'film'
});
module.exports.Film = Film;
module.exports.Actor = Actor;



