// BUILDING SERVER USING EXPRESS JS
const express = require('express');   //importing express module

const app = express();              //creating app using express
app.use(express.json());         // in simple words this line helps to convert json data to js object

const port = 8081;

const toDoList = ["learn", "apply things", "succeed"];

// http://localhost:8081/todos
// in express we can directly create routes using app.get, app.post etc methods
//no need to use those if else or switch case statements like we did in pure node js server
// to handle different routes 
// GET method route
app.get('/todos', (req, res) => {    // req -> request from client , res -> response from server
    //res.writeHead(200);  // not needed in express js
    //res.write(toDoList);  // not needed in express js)

    res.status(200).send(toDoList);  // sending response to client with status code 200
}); 


// POST method route
app.post('/todos', (req, res) => {    // req -> request from client , res -> response from server

    let newToDoItem = req.body.name;  // getting new todo item from request body
    toDoList.push(newToDoItem);       // adding new todo item to the list
    res.status(201).send({message: "Task added successfully"});   // sending updated todo list to client with status code 201
}); 

// DELETE method route
app.delete('/todos', (req, res) => {    // req -> request from client , res -> response from server
    const delteThisItem = req.body.name;  // getting todo item to delete from request body

    toDoList.find((elem, index) => {   // finding the index of the todo item to delete
        if(elem === delteThisItem){
            toDoList.splice(index, 1);   // deleting the todo item from the list
        }
        res.status(202).send({message: `Deleted item ${req.body.name} `});   // sending response to client with status code 202
    });

});

// FOR ALL THE METHODS (GET, POST, DELETE, PUT, PATCH etc)
// if the route is not defined above then this route will be executed
// this is like a fallback route
// this will handle all the undefined routes
// and send a response with status code 501 (not implemented)
app.all('/todos', (req, res) => {             // req -> request from client , res -> response from server
    res.status(501).send();   // sending response to client with status code 501 (not implemented)
});


app.listen(port, () => {      // starting server at port 8081
    console.log(`Server is running on port ${port}`);
});






