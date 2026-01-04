const http = require('http');          // Importing the HTTP module

const port = 8081;         // Defining the port number where the server will listen

http.createServer((req, res) => {      // callback function to handle incoming requests
    // Request handling logic can be added here
    res.writeHead(200, {'Content-Type': 'text/html'});       // Setting the response header...........200 means success (OK)
    res.write('<h2>Hey Server Started You Can Proceed :-) </h2>');           // Writing a response message
    res.end();                                               // Ending the response

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






