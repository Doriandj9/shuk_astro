import ViewPosts from "@/modules/web/pages/Posts/ViewPosts";
import type { PostData } from "@/modules/web/hooks/post/PostI";
import AppLayout from "@/modules/core/layouts/AppLayout";

type PostWrapperProps = {
    // post: PostData | null;
    // error: Error | null;
    id: string | null;
};

export const PostWrapper: React.FC<PostWrapperProps> = ({id}) => {

    return (
        <AppLayout>
            <ViewPosts id={id} />
        </AppLayout>
    );
};