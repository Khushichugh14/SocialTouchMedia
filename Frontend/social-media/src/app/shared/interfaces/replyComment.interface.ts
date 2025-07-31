export interface ReplyComment {
  reply_id: number;
  reply_user_id: number;
  reply_comment: string;
  reply_comment_time: string;
  reply_user_name: string;
  reply_user_image: string;
  is_deleted: boolean;
  is_reply:boolean;
}