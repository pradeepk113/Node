

let http=require('http');
let fs=require('fs');
let qs=require('querystring')
let server=http.createServer(requestHandler);
function requestHandler(req,res){
    var store=''
    req.on('data',(chunks)=>{
        store+=chunks;
    })
    req.on('end',()=>{
        if(req.method==="GET" && req.url==='/form'){
            res.setHeader('Content-Type','text/html');
            fs.createReadStream('./form.html').pipe(res)
        }
        if(req.method==="POST" && req.url==='/form'){
            var parsedData=qs.parse(store);
            console.log(parsedData)
            res.setHeader('Content-Type', 'text/html');
            res.write(`<h1>${parsedData.name}</h1>`)
            res.write(`<h2>${parsedData.age}</h2>`)
            res.write(`<p>${parsedData.email}</p>`)
            res.end()
        }
    })

}
server.listen(5678,()=>console.log('srever start at port 5678'))