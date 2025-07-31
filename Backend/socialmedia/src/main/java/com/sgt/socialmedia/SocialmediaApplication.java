package com.sgt.socialmedia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SocialmediaApplication {

	public static void main(String[] args) {
		ApplicationContext applicationContext=
		SpringApplication.run(SocialmediaApplication.class, args);
		System.out.println("hello world");
	}

}
