import React, { useEffect, useState } from 'react';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { Post } from 'src/models/posts/Post';

import PostItem from './GeneralPostItem';

const PostList: React.FC<PostListProps> = ({
  posts,
  loading,
  hideUserPics,
  toCloseRequest,
}): React.ReactElement => {
  const [requestList, setRequestList] = useState<React.ReactElement<any>[]>([]);
  const [requestsRendered, setRequestsRendered] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (posts) {
      const internalRequestList: React.ReactElement<any>[] = [];
      const internalRequestsRendered: Record<string, boolean> = {};
      for (const id in posts) {
        if (id && posts[id] && !requestsRendered[id]) {
          internalRequestsRendered[id] = true;
          internalRequestList.push(
            <PostItem
              key={id}
              // TODO: (es) remove requestId={id} // TODO: (es) Use key instead?  what is key used for?
              post={posts[id]}
              handleRequest={() => null}
            />,
          );
        }
      }

      if (internalRequestList.length) {
        setRequestsRendered(internalRequestsRendered);
        setRequestList(internalRequestList);
      }
    }
  }, [posts, hideUserPics, requestsRendered, toCloseRequest, setRequestList]);

  // issue with indefinite loading, needs fix
  if (loading) {
    return <LoadingIndicator />;
  }

  return <div>{requestList}</div>;
};

interface PostListProps {
  posts?: Record<string, Post>;
  loading: boolean;
  hideUserPics?: boolean;
  toCloseRequest?: Function;
}

export default PostList;