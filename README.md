# 小白兔的开发之路

#生成密钥与公钥

```
mikdir config 生成文件夹
cd config     进入文件夹
openssl       进入openssl
genrsa -out private.key 4096  #生成密钥文件
rsa -in private.key -pubout -out public.key  #生成公钥文件
exit



```
