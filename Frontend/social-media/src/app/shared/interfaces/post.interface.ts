export interface POST {
    isSaved: boolean;
    post_id: number,
    media_url: string,
    caption: string,
    no_of_likes: number,
    no_of_comments: number,
    created_at: string,
    image_url: string,
    user_id: number,
    user_name: string,
    tags: string,
    following_id: number,
    is_liked: boolean,
    isCommentVisible: boolean
}