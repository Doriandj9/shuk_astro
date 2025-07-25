import type { LanguageApp, ThemeOptions } from "@/config/@types/app";
import type { facebookUser, googleUser } from "@/modules/core/@types/gUser";
import type { DocStatusData } from "../hooks/post/PostI";

export type ResponseUserProps = {
    token: string;
    time_expired_token: string;
    jwt: string;
    is_user_provider: boolean;
};


export type User = {
    id: number;
    id_client?: string | null;
    id_provider?: number | null;
    full_name?: string | null;
    email?: string | null;
    password?: string | null;
    email_verified_at?: Date | null;
    phone?: string | null;
    birthday?: Date | null | string;
    nationality?: string | null;
    photo?: string | null;
    is_active?: boolean;
    doc_status?: DocStatusData;
    abilities?: string | null;
    data_login_social_media?: string | null | googleUser | facebookUser;
    is_user_provider?: boolean,
    username?: string;
    total_posts?: number;
    has_password?: boolean;
    config?: UserSettings;
    is_merge?: boolean;
    about_me?: string;
    token_reset_password?: string;
    gender?: 'M' | 'F';
    created_at?: string;
    updated_at?: string;
}

export type HidePostsUser = {
    id_posts: string[]
};
export type HidePostsCommentsUser = {
    id_comments: string[]
};

export type UserSettings = {
    language: LanguageApp;
    notifications_by_mail: boolean;
    notifications_by_app: boolean;
    hidden_mail: boolean;
    hidden_phone_number: boolean;
    theme: ThemeOptions;
    hide_posts: HidePostsUser;
    hide_comments: HidePostsCommentsUser;
};

export interface InfinityData<T>{
      current_page: number;
      data: T[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: LinksObj[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
      total_draft?: number;
}