

export interface User {
  user_id: number;
  user_name: string;
  dob: Date;
  bio: string;
  image_url: string;
  posts_count: number;
  followers_count: number;
  following_count: number;
  posts: any[];
  saved_posts: any,
  contact:string,
  email:string
  account_status:number
}
