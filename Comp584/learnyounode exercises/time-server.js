// Loads net module
const net = require('net');

// Creates Node TCP server that takes a connection listener
const server = net.createServer(function(socket) {
    // create new date object
    const date = new Date();

    const year = date.getFullYear();
    // Month is zero indexed, so add 1; also zero pad the start for single digits
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    // Zero pad day for single digits 
    const day = date.getDate().toString().padStart(2,'0');
    // Zero pad hours for single digits
    const hours = date.getHours().toString().padStart(2,'0');
    // Zero pad minutes for single digits
    const minutes = date.getMinutes().toString().padStart(2,'0');

    // Format the date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    // Write the formatted date to the socket
    socket.write(`${formattedDate}\n`);
    // Close the connection
    socket.end();
})

// Server listens on the port number provided as the first command-line argument
server.listen(process.argv[2]);