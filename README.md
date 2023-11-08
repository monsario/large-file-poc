# large-file-poc

This is a POC code that shows capability of a node.js code to access AWS S3 bucket that can possibly contain large files. 
The S3 content can be accessed and the chunks of data get streamed all the way to the caller. 
There is no need to temporarily store the S3 contents on the compute environment and then stream it to the caller. 

To further display the capability of streaming the larger files all the way to the caller (browser), configuration file 
of nginx.conf shows that the webserver has timeout settings of around 3 seconds.

To run this:
1. Revise code first to add AWS credentials
2. At the root project folder, run:
      npm install
4. At the root project folder, run:
      node server.js

Once application is running, run this URL in the browser http://localhost:3000/download. File will get downloaded through the default browser download manager.
