//*************Path**************** */
//  1 capture absolute path of server.js(itself)
//console.log(__filename)
//  2 get absolute path of app.js
//console.log(__dirname +'/app.js')
//  3 get realtive path of index.html
//console.log('./index.html')
//  4 get absolute path of index.html using path module;
// var path=require('path');
// var absolutePathOfIndex=path.join(__dirname,"index.html")
// console.log(absolutePathOfIndex)

//**************Capture Data on Server*********** */
var http = require("http");
var qs = require("querystring");
let server = http.createServer(handleRequest);
function handleRequest(req, res) {
  var store = "";
  var dataFormat = req.headers["content-type"];
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (dataFormat === "application/x-www-form-urlencoded") {
      let formData = qs.parse(store);
      console.log(formData)
      res.setHeader('Content-Type','text/html')
      res.end(`<h2>Team Name is ${formData.team}</h2><p> Captain is ${formData.captain}</p>`);
      
    }
    if(dataFormat==='application/json'){
        var parsedData=JSON.parse(store)
        //console.log(parsedData)
        res.setHeader('Content-Type','text/html')
        res.end(`<h2>Team Name is ${parsedData.team}</h2><p> Captain is ${parsedData.captain}</p>`)
    }
  });
}
server.listen(3000, () => console.log("server start at port 3000"));
