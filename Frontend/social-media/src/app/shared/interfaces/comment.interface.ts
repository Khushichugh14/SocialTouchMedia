export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    comment: string;
    comment_time: string;
    user_name: string;
    user_image: string;
    active_yn: number;
    no_of_comments: number;
    ReplyCount: number;
    is_deleted: boolean;
    is_reply:boolean;
    repliesBox: boolean;
}