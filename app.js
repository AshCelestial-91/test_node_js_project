const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const namefinder = require('./namefinder');

app.use(cors());
//app.set('view engine', 'pug')

/*app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next();
});*/

app.use('/monsters/', (req, res, next) => {
    req.requestTime = Date.now();
    console.log('Method: ' + req.method + ' Time: ' + req.requestTime);
    next();
});

const monsters = [
    {
        id: 1,
        name: 'vampire'
    },
    {
        id: 2,
        name: 'demon'
    },
    {
        id: 3,
        name: 'balrog'
    }
];


app.param('name', (req, res, next, name) => {
    console.log(name);
    next();
});

app.get('/monsters/', (req, res) => {
    res.send(monsters)
});

app.get('/monsters/:name', (req, res, next) => {
    const monster = namefinder.findName(req.params.name, monsters);
    if (!monster) {
        const error = new Error('This monster does not exist!');
        error.status = 404;
        return next(error);
    }
    res.send(monster);
});

app.post('/monsters/:name', (req, res, next) => {
    const newMonster = req.params.name;
    for (let i = 0; i < monsters.length; i++) {
        if (newMonster === monsters[i]['name']) {
            const error = new Error('This monster already exists!');
            error.status = 400;
            return next(error);
        }
    }
    monsters.push({id: monsters.length + 1, name: newMonster});
    res.send(`New monster ${newMonster} was created!`)
});

app.put('/', (req, res) => {
    res.send('Update')
});

app.delete('/monsters/:name', (req, res, next) => {
    const monsterToRemove = req.params.name;
    for (let i = 0; i < monsters.length; i++) {
        if (monsterToRemove === monsters[i]['name']) {
            const reqMonsterIndex = monsters.findIndex(function (obj) {
                return obj['name'] === monsterToRemove;
            });
            monsters.splice(reqMonsterIndex, 1);
            console.log(reqMonsterIndex);
            res.send(`The monster ${monsterToRemove} was deleted!`);
            return;
        }
    }
    const error = new Error('This monster cannot be found!');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    return console.log(`Example application listening on port ${port}!`);
});