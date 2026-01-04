const http = require('http');          // Importing the HTTP module

const port = 8081;         // Defining the port number where the server will listen

// HTTP METHODS: GET, POST, PUT, DELETE, PATCH
/**
 * >> GET: To fetch data from the server. ITS THE DEFAULT METHOD
 * >> POST: To send data to the server.
 * >> PUT: To update existing data on the server.
 * >> DELETE: To delete data from the server.(the database)
 * >> PATCH: To make partial updates to existing data on the server.
 
Difeerence between PUT and PATCH:
- PUT is used to update the entire resource, while PATCH is used to update a part of the resource.
- PUT is indempotent, meaning that multiple identical requests will have the same effect as a single request. PATCH is not necessarily idempotent.
 */

const toDoList = ["learn", "apply things", "succeed"];  // Sample data representing a to-do list

http.createServer((req, res) => {      // callback function to handle incoming requests
    const { method, url } = req;          // Destructuring the method and url from the request object
   // console.log(method, url);
   //below the if condition is used to handle the request for /todos endpoint
   // So when a request is made to /todos, it checks if the method is GET
   // If it is, it responds with the toDoList data
   // If the method is not GET, it simply ends the response without sending any data
   // This is a basic way to handle different routes and methods in a Node.js HTTP server
if(url === "/todos"){
    if(method === "GET"){
        res.writeHead(200);     //writehead is used to write the response header with status code 200 (OK) 
        res.write(toDoList.toString());      //write is used to write the response body with the toDoList data converted to a string
    }
}
    res.end();                       // Ending the response without sending any data    
    
    
    
    // Request handling logic can be added here
    // res.writeHead(200, {'Content-Type': 'text/html'});       // Setting the response header...........200 means success (OK)
    // res.write('<h2>Hey Server Started You Can Proceed :-) </h2>');           // Writing a response message
    // res.end();                                               // Ending the response

})
//below code is used to start the server.....same everywhere
.listen(port, () => {                  // Listening on the specified port
    console.log(`NodeJs Server Started Running on Port ${port}`);  // Logging a message when the server starts
})

/* http://localhost:8081            give this link in the browser */


// This is a simple HTTP server that listens on port 8081. It does not handle any requests yet.
// You can add request handling logic inside the createServer callback function.
// For example, you can respond with a simple message for every request:
// Above what we are basically doing is that we are creating a server using the http module in Node.js.
// When a request is received, the callback function is executed with the request and response objects as parameters.
// You can use the response object to send data back to the client.


/****************ROUTES******************* */
// http://localhost:8081/signin
// http://localhost:8081/signup
// http://localhost:8081/Home
// http://localhost:8081/ContactUs
// http://localhost:8081/AboutUs

