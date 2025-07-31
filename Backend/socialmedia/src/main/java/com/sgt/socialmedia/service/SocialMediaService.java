package com.sgt.socialmedia.service;

import com.sgt.socialmedia.repository.SocialMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.JobKOctets;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class SocialMediaService {

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    SocialMediaRepository socialMediaRepository;

    public List<Map<String,Object>> fetchAllPost(int user_id){
        return socialMediaRepository.fetchAllPosts(user_id);
    }

    public List<Map<String,Object>> fetchFollowers(int user_id){
        return socialMediaRepository.fetchFollowers(user_id);
    }

    public List<Map<String,Object>> fetchFollowing(int user_id){
        return socialMediaRepository.fetchFollowing(user_id);
    }

    public void uploadFile(MultipartFile data){
        Path path = Paths.get("uploads");
        try{
            if(!Files.exists(path)){
                Files.createDirectory(path);
            }
            String fileName = StringUtils.cleanPath(data.getOriginalFilename());
            Path finalPath = path.resolve(fileName);
            ///uploads/harsh_cha
            InputStream inputStream = data.getInputStream();
            Files.copy(inputStream, finalPath, StandardCopyOption.REPLACE_EXISTING);

        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    public ResponseEntity<String> createPost(Map<String,Object> body){
        String caption = (String) body.get("caption");
        String image_url = (String) body.get("image_url");
        String tags = (String) body.get("tags");
        int id = (int) body.get("id");
//        System.out.println(fullName+" "+contact+" "+email+" "+password+" "+image_url);
        int noOfRows = socialMediaRepository.createPost(id,caption,image_url,tags);
        if(noOfRows > 0 ) return ResponseEntity.ok().body("Posted Successfully");
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Post failed");
    }
    public ResponseEntity<Integer> likePost(Map<String,Object> body){
        int id = (int) body.get("post_id");
        int user_id = (int) body.get("user_id");
        System.out.println("like: "+user_id+" "+id);
        int noOfRows = socialMediaRepository.likePost(id,user_id);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }
    public ResponseEntity<Integer> unlikePost(Map<String,Object> body){
        int id = (int) body.get("post_id");
        int user_id = (int) body.get("user_id");
        System.out.println("unlike: "+user_id+" "+id);
        int noOfRows = socialMediaRepository.unLikePost(id,user_id);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public ResponseEntity<Integer> addComment(Map<String,Object> body){
        int id = (int) body.get("post_id");
        int user_id = (int) body.get("user_id");
        String comment=(String) body.get("comment");
        int noOfRows = socialMediaRepository.addComment(user_id,id,comment);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public ResponseEntity<Integer> deleteComment(Map<String,Object> body){
        int post_id = (int) body.get("post_id");
        int user_id = (int) body.get("user_id");
        int comment_id=(int) body.get("comment_id");
        int noOfRows = socialMediaRepository.deleteComment(user_id,post_id,comment_id);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public ResponseEntity<List<Map<String,Object>>> fetchComments(Map<String,Object> body) {
        int id = (int) body.get("post_id");
        return ResponseEntity.ok().body(this.socialMediaRepository.fetchComments(id));
    }
    public ResponseEntity<Integer> addReplyComment(Map<String,Object> body){
        int comment_id = (int) body.get("comment_id");
        int user_id = (int) body.get("user_id");
        String comment=(String) body.get("comment");
        int noOfRows = socialMediaRepository.addReplyComment(user_id,comment_id,comment);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public ResponseEntity<Integer> deleteReplyComment(Map<String,Object> body){
        int reply_id = (int) body.get("reply_id");
        int user_id = (int) body.get("user_id");
        int comment_id=(int) body.get("comment_id");
        int noOfRows = socialMediaRepository.deleteReplyComment(user_id,reply_id,comment_id);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public ResponseEntity<List<Map<String,Object>>> fetchReplyComments(Map<String,Object> body) {
        int id = (int) body.get("comment_id");
        return ResponseEntity.ok().body(this.socialMediaRepository.fetchReplyComments(id));
    }
    public int removeFollower(Map<String,Object> body){
        System.out.println(body);
        int follower_id=(int) body.get("follower_id");
        return socialMediaRepository.removeFollower(follower_id);
    }

    public int removeFollowing(Map<String,Object> body){
        System.out.println(body);
        int following_id=(int) body.get("following_id");
        return socialMediaRepository.removeFollowing(following_id);
    }

    public List<Map<String,Object>> fetchAddFriends(Map<String,Object> body){
        int user_id = (int) body.get("user_id");
        return socialMediaRepository.fetchAddFriends(user_id);
    }
    public ResponseEntity<Integer> addFollower(Map<String,Object> body){
        int user_id = (int) body.get("user_id");
        int follower_id = (int) body.get("follower_id");
        int noOfRows = socialMediaRepository.addFollower(user_id,follower_id);
        if(noOfRows > 0 ) return ResponseEntity.ok().body(1);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(0);
    }

    public Map<String,Object> insertSavedPosts(int userid, int postID){
        return socialMediaRepository.insertSavedPosts(userid, postID);
    }

    public void deleteSavedPost(int userid, int postID){
         socialMediaRepository.deleteSavedPost(userid, postID);
    }



    public String saveProfilePicture(String userId,MultipartFile file) throws IOException {

        int user_id = Integer.parseInt(userId);
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), Paths.get(uploadDir + File.separator + fileName));
        socialMediaRepository.alterimageurl(user_id,fileName);
        return fileName;
    }



}
