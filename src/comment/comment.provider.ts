/**
 * 定义查询片段
 *
 */

export const sqlfragement = {
  leftjoinUser: `
          left join user 
          on user.id = comment.userid 
          left join  avatar
          on user.id = avatar.userid 
      `,
  user: `
          json_object( 
             'id',user.id,
             'name',user.name,
             'avatar',if(count(avatar.id),1,null)
          ) as user 
      `,
  leftjoinpost: `
         left join post
         on comment.postid=post.id 
      
      
      `,
  post: `
         json_object(
             'id',post.id,
             'title',post.title 
         ) as post 
      `,

  repliedComment: `
      (
        select 
            json_object(
                'id',replycomment.id,
                'content',replycomment.content 
            )
        from comment replycomment 
        where comment.parentid=replycomment.id 


      ) as repliedComment 
  
  
  `,
  totalcomments: `

     (
       select count(reply.id) from comment reply where comment.id=reply.parentid 

     ) as totalcomments
     
  
  
  `,
};
