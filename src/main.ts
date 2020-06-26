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

import express from 'express';
import { Request, Response } from 'express';

const app = express();
const port = 3000;

/**
 * 使用JSON中间件,客户端发过来的json数据处理好，让接口可以直接使用
 */

app.use(express.json());

app.listen(port, () => {
  console.log('新的开始！ 翻滚吧，郭锐');
});
app.get('/', (req: Request, res: Response) => {
  res.send('你好');
});
const data = [
  {
    id: 1,
    author: '李白',
    title: '将进酒',
  },
  {
    id: 2,
    author: '杜甫',
    title: '望春',
  },
  {
    id: 3,
    author: '白居易',
    title: '琵琶行',
  },
];

app.get('/posts', (req: Request, res: Response) => {
  res.send(data);
});

app.get('/posts/:postid', (req: Request, res: Response) => {
  const { postid } = req.params;
  const posts = data.filter(item => item.id == parseInt(postid, 10));
  res.send(posts[0]);
});

/**
 * 创建内容
 */

app.post('/posts', (req: Request, res: Response) => {
  //获取请求数据
  const { content } = req.body;
  console.log(req.body);
  console.log(req.headers['sing-along']);
  console.log(req.header);

  //设置响应状态码
  res.status(201);

  res.set('sing-along', 'i like sing a long');
  //express 会将字典格式的对象  自动转化为json格式的数据发送给客户端
  res.send({
    message: `成功创建了内容:${content}`,
  });
});
