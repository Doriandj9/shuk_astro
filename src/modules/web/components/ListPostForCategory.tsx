import AppDisplayPost from "@/modules/core/components/AppDisplayPost";
import AppErrorFetchingPosts from "@/modules/core/components/AppErrorFetchingPosts";
import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import AppNotPosts from "@/modules/core/components/AppNotPosts";
import InfinityScroll from "@/modules/core/components/InfinityScroll";
import { useGetInfinityPostsForCategory } from "@web/hooks/post/hooks";
import type { ParamsPostInfinityFn } from "../hooks/post/PostI";
import { useEffect, useState } from "react";
import { KeysPostContext } from "../providers/KeysPosts";

type ListPostProps = {
  category_name?: string;
  category_id?: string;
};

const ListPostForCategory: React.FC<ListPostProps> = ({ category_id, category_name }) => {
  const params: ParamsPostInfinityFn = { per_page: '2', category_name, category_id };
  const [keys, setKeys] = useState<ParamsPostInfinityFn[]>([params]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetInfinityPostsForCategory(params);

  useEffect(() => {
    setKeys([{ per_page: '2', category_name, category_id }]);
  }, [category_id, category_name]);
  return (
    <>
      <KeysPostContext.Provider value={{keys, setKeys}}>

        <InfinityScroll
          render={(scroll) => {
            if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
              scroll.changeStatus({ action: false });
              fetchNextPage();
            }

            return (
              <div className="flex flex-col gap-2 md:items-center">
                {data?.pages.map(({ data: posts }) => {
                  return posts.map((post) => (
                    <div
                      className={`app-container-fade text-sm mt-2 
                      ${post?.path_resource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && post?.path_resource?.meta?.typeAspectRadio?.neutral?.height > 500
                          ? 'app-container-post-vertical' : 'app-container-post'}`}
                      key={post.id}
                    >
                      <AppDisplayPost post={post} />
                    </div>
                  ));
                })}
                {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                {status != 'error' && status == 'pending' && (<AppLoadingPosts />)}
                {status != 'error' && isFetchingNextPage && (<AppLoadingPosts />)}
                {status !== 'error' && !hasNextPage && (
                  <div className="mt-4">
                    <AppNotPosts />
                  </div>
                )}
              </div>
            );
          }}
        />
      </KeysPostContext.Provider>
    </>
  );
};

export default ListPostForCategory;
