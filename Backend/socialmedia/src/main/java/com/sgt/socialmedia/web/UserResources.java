package com.sgt.socialmedia.web;

import com.sgt.socialmedia.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserResources {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> insertUser(@RequestBody Map<String,Object> body){
        return userService.insertUser(body);
    }

    @PostMapping("/login")
    public Map<String,Object> loginUser(@RequestBody Map<String , Object> body){

        return userService.loginUser(body);
    }
    @GetMapping("/students")
    public List<String> getStudentsNames(HttpServletRequest httpServletRequest){
        return  userService.getStudentsNames(httpServletRequest);
    }
    @PostMapping("/sendMail")
    public void ValidateandSendMail(@RequestBody Map<String , Object> body){
        userService.ValidateandSendMail(body);
    }

    @GetMapping("/getUser/{user_id}")
    public Map<String, Object> fetchUserDetails(@PathVariable int user_id) {
        return userService.fetchUserDetails(user_id);
    }

    @PostMapping("/getPost")
    public Map<String,Object> fetchPostDetails(@RequestBody Map<String,Object> body){
        return userService.fetchPostDetails(body);
    }

    @GetMapping("/getSave/{user_id}")
    public Map<String,Object> fetchSaveDetails(@PathVariable int user_id){
        return userService.fetchSaveDetails(user_id);
    }

    @PostMapping("/logout")
    public int logout(@RequestBody Map<String,Object> body){
        System.out.println(body);
        return userService.logout(body);
    }

    @PostMapping("/deactivate")
    public int deactivate(@RequestBody Map<String,Object> body){
//        System.out.println(body);
        return userService.deactivate(body);
    }


    @PostMapping("/changePassword")
    public ResponseEntity<Map<String, Object>> changePassword(@RequestBody Map<String, Object> body) {
        System.out.println(body);
        return userService.changePassword(body);
    }



    @PostMapping("/updateusername/{user_id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable int user_id,@RequestBody Map<String,Object> body) {
        System.out.println(body);
        return userService.updateUser(user_id,body);
    }

    @PostMapping("/updatebio/{user_id}")
    public ResponseEntity<Map<String, Object>> updateBio(@PathVariable int user_id,@RequestBody Map<String,Object> body) {
        System.out.println(body);
        return userService.updateBio(user_id,body);
    }

    @PostMapping("/updateaccountstatus/{user_id}")
    public ResponseEntity<Map<String, Object>> updateAccountStatus(@PathVariable int user_id, @RequestBody Map<String, String> request) {
        int account_status = request.get("privacy").equalsIgnoreCase("Private") ? 1 : 0;
        return userService.updateAccountStatus(user_id, account_status);
    }

}
