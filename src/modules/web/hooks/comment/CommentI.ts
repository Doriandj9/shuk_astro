import type { ResponseCreateApi } from "@/modules/core/@types/core";
import type { User } from "../../@types/web";
import type { DocStatusData, PostData } from "../post/PostI";


export interface CommentData {
    id?: number | string;
    post_id?: number | string | null;
    user_id?: number;
    reply_comment_id?: number | string | null;
    description: string;
    status?: DocStatusData;
    is_active?: boolean;
    likes: number;
    replies: number;
    payload_user?: string | null;
    post?: PostData;
    user?: User;
    replyComment?: CommentData;
    created_at?: string;
}


export type CreateCommentPost = {
    (data: CommentData): Promise<ResponseCreateApi<{comment: CommentData , post: PostData}>['data']>;
};