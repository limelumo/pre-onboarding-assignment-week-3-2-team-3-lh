import { useEffect } from 'react';
import Comment from './Comment';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentListData, fetchPaginatedData } from '../store/comment-slice';
import { setTotalPageNumber } from '../store/page-slice';

import styled from 'styled-components';

const CommentList = () => {
  const dispatch = useDispatch();

  const commentList = useSelector((state) => state.comment.commentList);
  const totalComments = useSelector((state) => state.comment.totalComments);

  const commentPerPage = useSelector((state) => state.page.commentPerPage);
  const currentPage = useSelector((state) => state.page.currentPage);

  useEffect(() => {
    const totalPage = Math.ceil(totalComments / commentPerPage);

    dispatch(fetchCommentListData());
    dispatch(fetchPaginatedData(commentPerPage, currentPage));
    dispatch(setTotalPageNumber(totalPage));
  }, [totalComments, currentPage, dispatch]);

  return (
    <section>
      {commentList &&
        commentList.map((comment, id) => (
          <CommentContainer key={id}>
            <Comment {...comment} />
          </CommentContainer>
        ))}
    </section>
  );
};

const CommentContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export default CommentList;
