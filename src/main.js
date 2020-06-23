const http=require('http')
const server=http.createServer((request,response)=>{
    response.writeHead(200,{
        'Content-Type':"text/html;charset=utf-8"
    })

    const data={
        book:"自由万岁",
        price:"30",
        id:1
    } 
    const jsondata=JSON.stringify(data)
    switch(request.url){
        case '/':
            response.write("成功!",'utf-8');
            break;
        case '/zhuce':
            response.write('打开注册界面');
            break
        case '/denglu':
            response.write("打开登陆界面!");
            break;
        case '/shuru':
            response.write('<b>我热爱自己的祖国</b>');
            break;
        case '/book':
            response.writeHead(200,{
                'Content-Type':"application/json;charset=utf-8"
            })
            response.write(jsondata);
            break;
        default:
            response.writeHead(404);
            response.write('404');
            break;
    }

    response.end();

});

server.listen(3000,()=>{
    console.log("服务已经启动，重新出发！")
})