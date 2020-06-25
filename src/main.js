// const http=require('http')
// const server=http.createServer((request,response)=>{
//     response.writeHead(200,{
//         'Content-Type':"text/html;charset=utf-8"
//     })

//     const data={
//         book:"自由万岁",
//         price:"30",
//         id:1
//     } 
//     const jsondata=JSON.stringify(data)
//     switch(request.url){
//         case '/':
//             response.write("成功!",'utf-8');
//             break;
//         case '/zhuce':
//             response.write('打开注册界面');
//             break
//         case '/denglu':
//             response.write("打开登陆界面!");
//             break;
//         case '/shuru':
//             response.write('<b>我热爱自己的祖国</b>');
//             break;
//         case '/book':
//             response.writeHead(200,{
//                 'Content-Type':"application/json;charset=utf-8"
//             })
//             response.write(jsondata);
//             break;
//         default:
//             response.writeHead(404);
//             response.write('404');
//             break;
//     }

//     response.end();

// });

// server.listen(3000,()=>{
//     console.log("服务已经启动，重新出发！")
// })





const express=require('express');
const app=express();
const port=3000;

app.listen(port,()=>{
    console.log("新的开始！")
});
app.get('/',(req,res)=>{
  res.send('你好')
});
const data=[
    {
        id:1,
        author:"李白",
        title:"将进酒"
    },
    {
        id:2,
        author:"杜甫",
        title:"望春"
    },
    {
        id:3,
        author:"白居易",
        title:"琵琶行"
    }
];

app.get('/posts',(req,res)=>{
    res.send(data)
});

app.get('/posts/:postid',(req,res)=>{
    const { postid }=req.params
    const posts=data.filter(item=>item.id==postid);
    res.send(posts[0])
})















