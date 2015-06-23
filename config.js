var path = require('path');

module.exports = {
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen 
    securePort: 8433,                                   // The HTTPS port on which the server is to listen  /// NOT IMPLEMENTED
    distFolder: path.resolve(__dirname, './client'),  // The folder that contains the application files 
    staticUrl: '/',                               // The base url from which we serve static files (such as js, css and images)
    cookieSecret: 'angular-app'                         // The secret for encrypting the cookie  /// NOT IMPLEMENTED
  }
};