import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import { useGetPost } from "../../hooks/post/hooks";
import AppLoadingComments from "@/modules/core/components/AppLoadinComments";
import AppDisplayPost from "@/modules/core/components/AppDisplayPost";
import { setMetaData } from "@/modules/core/utilities/metaData";
import { useMemo } from "react";
import { setAppTitle } from "@/modules/core/utilities/titles";
import { serializeText } from "@/modules/core/utilities/lettersAndComponents";
import { NotFound } from "@/modules/core/components/NotFound";

type ViewPostsProps = {
    id: string | null;
};

const ViewPosts: React.FC<ViewPostsProps> = ({ id }) => {

    const { isLoading, data: post, isError } = useGetPost(id);

    if (post) {
        const title = serializeText(post.description ?? '');

        setAppTitle(title.length > 50 ? `${title.substring(0, 50)}...` : title);
    }

    useMemo(() => {
        if (post) {
            setMetaData(post);
        }
    }, [post]);

    return (
        <>
            <div className="flex flex-col gap-2 md:items-center">
                {
                    isLoading &&
                    <AppLoadingPosts count={1}>
                        <AppLoadingComments />
                    </AppLoadingPosts>
                }

                {
                    (!isError && post) &&
                    <div
                        className={`app-container-fade text-sm mt-2 
                      ${post?.path_resource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && post?.path_resource?.meta?.typeAspectRadio?.neutral?.height > 500
                                ? 'app-container-post-vertical' : 'app-container-post'}`}
                        key={post.id}
                    >
                        <AppDisplayPost post={post} />
                    </div>
                }

            </div>
            {
                isError &&
                <div className="w-full">
                    <NotFound isNotComponent={false} />
                </div>
            }
        </>

    );
};

export default ViewPosts;