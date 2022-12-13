var http = require("http");
var fs = require("fs");
let url = require("url");
//console.log(url)
let pathName = __dirname + "/users/";
//console.log(pathName)
var server = http.createServer(requesthandler);
function requesthandler(req, res) {
  let parsedUrl = url.parse(req.url, true);
  //console.log(parsedUrl);
  var store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    //********Create Operation*************** */
    if ((req.method === "POST", req.url === "/users")) {
      var username = JSON.parse(store).userId;
      fs.open(pathName + username + ".json", "wx", (err, fd) => {
        if (err) {
          //console.log(err);
        }
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created succesfully`);
          });
        });
      });
    }
    //**********Read Operation************ */
    if (parsedUrl.pathname === "/users" && req.method === "GET") {
      console.log(parsedUrl);
      let username = parsedUrl.query.username;
      fs.readFile(pathName + username + ".json", (err, content) => {
        if (err) {
          console.log(err);
        }
        res.setHeader("Content-Type", "text/json");
        return res.end(content);
      });
    }
    //***************Update Operation*********** */
    if (parsedUrl.pathname === "/users" && req.method === "PUT") {
      let username = parsedUrl.query.username;
      fs.open(pathName + username + ".json", "r+", (err, fd) => {
        if (err) {
          console.log;
        }
        fs.ftruncate(fd, (err) => {
          if (err) return err;
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} updated successfully`);
            });
          });
        });
      });
    }
    //***********Delete Operation ************** */
    if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
      let username = parsedUrl.query.username;
      fs.unlink(pathName + username + ".json", (err) => {
        if (err) return console.log(err);
        return res.end(`${username} is deleted`);
      });
    }
    //********** */   if no cindition found*******
    res.statusCode = 404;
    res.end("Page Not Found");
  });
}
server.listen(3000, () => console.log("server start at port 3k"));
