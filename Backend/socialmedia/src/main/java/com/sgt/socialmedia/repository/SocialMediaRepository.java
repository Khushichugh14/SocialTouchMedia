package com.sgt.socialmedia.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SocialMediaRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String,Object>> fetchAllPosts(int user_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_all_posts ?",user_id);
    }

    public List<Map<String,Object>> fetchFollowers(int user_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_followers ?",user_id);
    }

    public List<Map<String,Object>> fetchFollowing(int user_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_following ?",user_id);
    }

    public int createPost(int id,String caption,String image_url,String tags){
        return jdbcTemplate.update("EXEC social_media.sp_create_post  ?,?,?,?",caption,image_url,id,tags);
    }
    public int likePost(int post_id,int user_id){
        return jdbcTemplate.update("EXEC social_media.sp_like_post  ?,?",user_id,post_id);
    }
    public int unLikePost(int post_id,int user_id){
        return jdbcTemplate.update("EXEC social_media.sp_unlike_post  ?,?",user_id,post_id);
    }

    public int addComment(int user_id,int post_id,String comment){
        return jdbcTemplate.update("EXEC social_media.sp_insert_comment  ?,?,?",user_id,post_id,comment);
    }

    public int deleteComment(int user_id,int post_id,int comment_id){
        return jdbcTemplate.update("EXEC social_media.sp_delete_comment  ?,?,?",user_id,post_id,comment_id);
    }

    public List<Map<String,Object>> fetchComments(int post_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_comments  ?",post_id);
    }
    public int addReplyComment(int user_id,int comment_id,String comment){
        return jdbcTemplate.update("EXEC social_media.sp_insert_reply_comment  ?,?,?",user_id,comment_id,comment);
    }

    public int deleteReplyComment(int user_id,int reply_id,int comment_id){
        return jdbcTemplate.update("EXEC social_media.sp_delete_reply_comment  ?,?,?",user_id,comment_id,reply_id);
    }

    public List<Map<String,Object>> fetchReplyComments(int post_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_reply_comments  ?",post_id);
    }
    public int removeFollower(int follower_id){
        return jdbcTemplate.update("EXEC social_media.sp_remove_follower ?",follower_id);
    }

    public int removeFollowing(int following_id){
        System.out.println("Bhai Bhai");
        return jdbcTemplate.update("EXEC social_media.sp_remove_following ?",following_id);
    }

    public List<Map<String,Object>> fetchAddFriends(int user_id){
        return jdbcTemplate.queryForList("EXEC social_media.sp_fetch_users_to_add_as_friends ?",user_id);
    }

    public int addFollower(int user_id,int follower_id){
        return jdbcTemplate.update("EXEC social_media.[sp_add_follower] ?,?",user_id,follower_id);
    }

    public Map<String,Object> insertSavedPosts(int user_id, int post_id){
        return jdbcTemplate.queryForMap("EXEC [social_media].[sp_SavePost] ?,?",user_id,post_id);
    }

    public void deleteSavedPost(int user_id, int post_id){
        jdbcTemplate.update("EXEC [social_media].[sp_UnSavePost] ?,?",user_id,post_id);
    }

    public void alterimageurl(int user_id,String image_url){
        jdbcTemplate.update("EXEC UpdateUserProfilePicture ?,?",user_id,image_url);
    }

}
