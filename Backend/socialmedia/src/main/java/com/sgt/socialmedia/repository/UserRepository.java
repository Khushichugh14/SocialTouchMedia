package com.sgt.socialmedia.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public int insertUser(String user_name,String email,String contact ,String password,String image,String dob,String bio){
        return jdbcTemplate.update("EXEC dbo.sp_registerUser ?,?,?,?,?,?,?",user_name,email,contact ,password,image,dob,bio);
    }
    public Map<String , Object> loginUser(String user_name , String password){
        return jdbcTemplate.queryForMap(" EXEC social_media.sp_LoginUser ?,?",user_name , password);
    }

    public Map<String , Object> validateToken(Integer user_id , String token){
        return jdbcTemplate.queryForMap("  dbo.sp_validate_token ?,?",user_id,token);
    }

    public Map<String, Object> validateEmail(String email){
        return jdbcTemplate.queryForMap(" EXEC  dbo.sp_validateEmail ?",email);
    }

    public Map<String, Object> generateToken(String email){
        return jdbcTemplate.queryForMap(" EXEC  dbo.sp_generateFPToken ?",email);
    }

    public Map<String,Object> fetchUserDetails(int user_id){
        return jdbcTemplate.queryForMap("EXEC [social_media].[fetchUserDetails] ?",user_id);
    }
    public Map<String,Object> fetchPostDetails(int post_id,int user_id){
        return jdbcTemplate.queryForMap("EXEC social_media.[sp_fetch_a_single_post] ?,?",user_id,post_id);
    }

    public Map<String,Object> fetchSaveDetails(int user_id){
        return jdbcTemplate.queryForMap("EXEC [social_media].[fetchSaveDetails] ?",user_id);
    }

    public int logout(int user_id){
        return jdbcTemplate.update("EXEC [social_media].[sp_LogoutUser] ?",user_id);
    }

    public int deactivate(int user_id){
        return jdbcTemplate.update("EXEC [social_media].[sp_DeactivateUser] ?",user_id);
    }

    public int changePassword(int user_id , String current_password, String new_password){
        return  jdbcTemplate.update("EXEC  [social_media].[sp_ChangePassword] ?, ?,?",user_id,current_password,new_password);
    }

    public int updateUser(int user_id, String newUsername) {
        return jdbcTemplate.update("EXEC UpdateUserDetails ?,?",user_id,newUsername);
    }

    public int updateBio(int user_id, String newBio) {
        return jdbcTemplate.update("EXEC UpdateUserBio ?,?",user_id,newBio);
    }

    public void updateAccountStatus(int user_id, int account_status) {
        jdbcTemplate.update("EXEC UpdateAccountStatus ?,?", user_id, account_status);
    }
}
