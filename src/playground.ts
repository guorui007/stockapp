const nature = () => {
  console.log('....');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('异步的动作终于处理完了');
    }, 2000);
  });
};

// nature().then(data => {
//   console.log(data);
// });
//async 是异步函数的标识  await 等待异步函数返回结果
const demo = async () => {
  const data = await nature();
  console.log(data);
};

demo();

console.log('我先来处理了！');
