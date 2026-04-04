=> work flow of file upload 

In a typical production app, you don't want to store user images permanently on your own server because it's hard to scale and slow to serve. Instead, you follow this workflow:
Multer receives the file from the user and holds it in your server's memory for a split second.
Your code then takes that file from Multer and sends it to Cloudinary for permanent storage.
Cloudinary returns a URL (e.g., https://res.cloudinary.com/...), which you then save in your database instead of the actual file. 



=> Middleware is a function that runs between request and response in a backend server.

Client → Middleware → Route Handler → Response


=> Middleware is just a function like this:

(req, res, next) => {
   // do something
   next();
}
Key parts:
req → incoming request
res → response
next() → move to next middleware or route

