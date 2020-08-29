export const sqlfragement = {
  user: `
    JSON_OBJECT(
        'ID',user.id,
        'Name',user.name
      ) as user 
    `,
  leftjoin: `
  left join user 
  on user.id=post.userid
    
    `,
  totalComments: `
  (
    select count(comment.id) from comment where post.id=comment.postid 
  ) as comnumber
  
  `,
  file: `
  cast(
    if (
       count(file.id),
       concat('[',
       group_concat(DISTINCT json_object(
         'id' ,file.id,
         'width',file.width,
         'height',file.height 
       ) order by file.id desc )
       
       ,']')
       
       ,NULL
    
    
    ) as json 
 ) as files 
  
  
  `,
  leftjoinfile: `
  left join lateral (
    select * from file where file.postid=post.id order by file.id desc limit 1
  
  ) as file 
  on file.postid=post.id
  `,
  tags: `
  cast(
    if(count(posttag.tagid),
    concat('[',
    group_concat(DISTINCT 
     json_object(
        'id',posttag.tagid,
        'tagname',tag.name 
     ) order by posttag.tagid desc 
    )
    ,']'),null  
    ) as json 
  ) as tags 
  `,
  leftjointags: `
  left join LATERAL(
    select * from posttag where posttag.postid=post.id limit 2 


) as posttag  on posttag.postid=post.id
left join tag on posttag.tagid=tag.id
  
  
  `,
};
