import ViewPosts from "@/modules/web/pages/Posts/ViewPosts";
import type { PostData } from "@/modules/web/hooks/post/PostI";
import AppLayout from "@/modules/core/layouts/AppLayout";

type PostWrapperProps = {
    post: PostData | null;
    error: Error | null;

};

export const PostWrapper: React.FC<PostWrapperProps> = ({post, error}) => {

    return (
        <AppLayout>
            <ViewPosts post={post} error={error} isLoading={false}   />
        </AppLayout>
    );
};