import { testFunction } from './modules/test.js'
import express from 'express';
import bodyParse from 'body-parser'
//primeiro passo: definir a inferface do utilizador
//npm install express; npm install -D @types/express;

interface IUser {
    id: number;
    name: string;
    email: string;
}

//get users
let users: IUser[] = [];
users = [{id: 1, name: 'jessica', email: 'jessica@outlook.com'},
        {id:2, name: 'luis', email: 'luis@outlook.pt'}]

users.push({id:3, name: 'fiama', email:'fiama@outlook.com'})
//console.log(users)

const app = express();
app.use(bodyParse.json());

//endpoint router (path);
app.get('/users/:id', (req: express.Request, res: express.Response) =>{
   const userId = parseInt(req.params.id); //para buscar  ID do utilizador
   const user = users.find((user) => user.id === userId)

   if(!user) {
    return res.status(404).json({error: 'user not found'}) ;
   }
   console.log(user)

return res.json(users)
}) //definindo uma função com REQUEST  e depois com RESPONSE.

//dados do utilizador tem que ser enviados pelo método POST.
//create new user
app.post('/users', (req: express.Request, res: express.Response) => {
    const newUser: IUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    }
    users.push(newUser);
    res.status(201).json(newUser);
});

app.delete('/users/:id', (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.params.id);
    const deletedUser = users.find((user) => user.id === userId) as IUser;

    if(!deletedUser) {
        return res.status(404).json({error: 'user not found'})
    }
    const index = users.indexOf(deletedUser);
    users.slice(index, 1);
    res.json(deletedUser);
    });


app.use(express.json()); //Formato que será utilizado e depois definir a porta que será utilizada
const PORT = 7950;
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

const msg: string = 'Hello NodeJS with TS!';
console.log(msg)

testFunction('index.ts');

//RestFul API 
//vantage: scalable, reliable, flexible, portable.
//level 0(plain old), level 1 (create user, get user), level 2 (appropriate HTTP verbs -> get, post, put, delete), 
//status code (states that helps front end to know the response) (200 -> everything ok(success), 300-> redirection, 400-> client error, 500 -> server error)
//create user: POST; delete user: DELETE; Get all users: GET; 
//
//data format: json, xml; transport: always html;
//Swagger - library to write documentation (router); There isn't standard by default
//CRUD: create, read, update and delete. 
