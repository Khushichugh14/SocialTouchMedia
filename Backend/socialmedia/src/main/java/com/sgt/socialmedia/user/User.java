package com.sgt.socialmedia.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.lang.annotation.Documented;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class User {
    private String nickname;
    private String  text;
    private Date time;
}
