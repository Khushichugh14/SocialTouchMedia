package com.sgt.socialmedia.web;

import com.sgt.socialmedia.service.SocialMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")

public class SocialMediaResource {

    @Autowired
    SocialMediaService socialMediaService;

    @GetMapping("/fetchpost/{user_id}")
    public List<Map<String,Object>> fetchAllPosts(@PathVariable int user_id ){
        System.out.println("User_id: "+user_id);
        return socialMediaService.fetchAllPost(user_id);
    }

    @GetMapping("/followers/{user_id}")
    public List<Map<String,Object>> fetchFollowers(@PathVariable int user_id ){
        return socialMediaService.fetchFollowers(user_id);
    }

    @GetMapping("/following/{user_id}")
    public List<Map<String,Object>> fetchFollowing(@PathVariable int user_id ){
        return socialMediaService.fetchFollowing(user_id);
    }

    @PostMapping("/uploadFile")
    public void uploadFile(@RequestParam MultipartFile file){
        this.socialMediaService.uploadFile(file);
    }

    @PostMapping("/create-post")
    public ResponseEntity<String> createPost(@RequestBody Map<String,Object> body){
        return this.socialMediaService.createPost(body);
    }
    @PostMapping("/like")
    public ResponseEntity<Integer> likePost(@RequestBody Map<String,Object> body){
        return this.socialMediaService.likePost(body);
    }
    @PostMapping("unlike")
    public ResponseEntity<Integer> unlikePost(@RequestBody Map<String,Object> body){
        return this.socialMediaService.unlikePost(body);
    }

    @PostMapping("/addComment")
    public ResponseEntity<Integer> addComment(@RequestBody Map<String,Object>body){
        return this.socialMediaService.addComment(body);
    }

    @PostMapping("/deleteComment")
    public ResponseEntity<Integer> deleteComment(@RequestBody Map<String,Object> body){
        return this.socialMediaService.deleteComment(body);
    }

    @PostMapping("/fetchComments")
    public ResponseEntity<List<Map<String,Object>>> fetchComments(@RequestBody Map<String,Object> body){
        return this.socialMediaService.fetchComments(body);
    }

    @PostMapping("/addReplyComment")
    public ResponseEntity<Integer> addReplyComment(@RequestBody Map<String,Object>body){
        return this.socialMediaService.addReplyComment(body);
    }

    @PostMapping("/deleteReplyComment")
    public ResponseEntity<Integer> deleteReplyComment(@RequestBody Map<String,Object> body){
        System.out.println(body);
        return this.socialMediaService.deleteReplyComment(body);
    }

    @PostMapping("/fetchReplyComments")
    public ResponseEntity<List<Map<String,Object>>> fetchReplyComments(@RequestBody Map<String,Object> body){
        return this.socialMediaService.fetchReplyComments(body);
    }
    @GetMapping(value = "/getUploadfiles/{file}",produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getImage(@PathVariable String file) throws IOException {
        System.out.println(file);
        String filename = file;
        File serverFile = new File("uploads/" + filename);
        return Files.readAllBytes(serverFile.toPath());
    }
    @PostMapping("/removeFollower")
    public int removeFollower(@RequestBody Map<String , Object> body){
        System.out.println(body);
        return socialMediaService.removeFollower(body);
    }

    @PostMapping("/removeFollowing")
    public int removeFollowing(@RequestBody Map<String , Object> body){
        System.out.println(body);
        return socialMediaService.removeFollowing(body);
    }

    @PostMapping("/fetchAddFriends")
    public List<Map<String,Object>> fetchAddFriends(@RequestBody Map<String,Object> body){
        return socialMediaService.fetchAddFriends(body);
    }

    @PostMapping("/addFollower")
    public ResponseEntity<Integer> addFollower(@RequestBody Map<String,Object> body){
        return socialMediaService.addFollower(body);
    }

    @PostMapping("/save/{userid}/{postID}")
    public Map<String,Object> getSavedPosts(@PathVariable int userid, @PathVariable int postID){
        return socialMediaService.insertSavedPosts(userid,postID);
    }

    @PostMapping("/unsave/{userid}/{postID}")
    public void deleteSavedPost(@PathVariable int userid, @PathVariable int postID){
         socialMediaService.deleteSavedPost(userid,postID);
    }

    @PostMapping("/uploadProfilePicture")
    public ResponseEntity<Map<String, Object>> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile file, @RequestParam("user_id") String user_id) {
        try {
            String imageUrl = socialMediaService.saveProfilePicture(user_id,file);
            return ResponseEntity.ok(Map.of("status", "success", "imageUrl", imageUrl));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("status", "failed", "message", e.getMessage()));
        }
    }

}
