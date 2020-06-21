const http=require('http')
const server=http.createServer((request,response)=>{
    response.write('helloe');
    response.end();
});

server.listen(3000,()=>{
    console.log("服务已经启动，重新出发！")
})