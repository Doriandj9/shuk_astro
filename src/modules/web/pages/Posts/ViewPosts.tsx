import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import AppLoadingComments from "@/modules/core/components/AppLoadinComments";
import AppDisplayPost from "@/modules/core/components/AppDisplayPost";

import type { PostData } from "../../hooks/post/PostI";

const ViewPosts = ({post, isLoading, error}: {post: PostData | null; isLoading: boolean;error: Error | null}) => {

    
    return (
            <div className="flex flex-col gap-2 md:items-center">
                {
                    isLoading &&
                    <AppLoadingPosts count={1}>
                        <AppLoadingComments />
                    </AppLoadingPosts>
                }

                {
                    post &&
                    <div
                        className={`app-container-fade text-sm mt-2 
                      ${post?.path_resource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && post?.path_resource?.meta?.typeAspectRadio?.neutral?.height > 500
                                ? 'app-container-post-vertical' : 'app-container-post'}`}
                        key={post.id}
                    >
                        <AppDisplayPost post={post} />
                    </div>
                }
                {
                    error &&
                    <div>
                        {error.message}
                    </div>
                }
            </div>
    );
};

export default ViewPosts;