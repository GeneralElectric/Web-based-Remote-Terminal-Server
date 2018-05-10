# Description
The Aperture server is a websocket-based implementation that allows a linux or windows device to share its terminal with a web-based interface for easy access of the device, remotely. The server implements socket.io on the backend as a means of channeling the communication between your frontend and the device you want to connect to.

# Configuration
All configuration for the server is stored in `/lib/config.json`.

# Installation
This application should be able to run on any Windows or Unix machine. Make sure to fill out your environment variables and then follow these steps:
```
git clone https://github.com/GeneralElectric/Web-based-Remote-Terminal-Server.git
npm start
```

# Usage
The server will sit and wait for connections from users and devices--there is no further usage or input needed.

# Contributing
If you feel you can improve this service in any way, I'm happy to accept pull requests for the good of the service. I'm pretty new to Node.js/JavaScript and there is always room for improvement; feel free to submit pull requests.
