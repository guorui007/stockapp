const fs = require('fs');
const path = require('path');

/**
 * 读取密钥文件
 */

const privatekey = fs.readFileSync(path.join('config', 'private.key'));
const publickey = fs.readFileSync(path.join('config', 'public.key'));

/**
 * 转换成base64格式
 */

const privatekeybase64 = Buffer.from(privatekey).toString('base64');
const publickeybase64 = Buffer.from(publickey).toString('base64');

/**
 * 输出转换结果
 */

console.log('\n private key:');
console.log(privatekeybase64);

console.log('\n public key:');
console.log(publickeybase64);
