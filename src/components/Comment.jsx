import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, fetchEditCommentData, fetchPaginatedData, setCommentStatus } from '../store/comment-slice';
import { setCurrentPage } from '../store/page-slice';

import styled from 'styled-components';

const Comment = ({ id, profile_url, author, createdAt, content }) => {
  const dispatch = useDispatch();

  const commentPerPage = useSelector((state) => state.page.commentPerPage);
  const currentPage = useSelector((state) => state.page.currentPage);

  const handleEditComment = (id) => {
    dispatch(fetchEditCommentData(id));
    dispatch(setCommentStatus('EDIT'));
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(deleteComment(commentId));
      dispatch(setCurrentPage(1));
      dispatch(fetchPaginatedData(commentPerPage, currentPage));
    }
  };

  return (
    <Item>
      <img src={profile_url} alt={`profile image_${id}`} />
      {author}

      <CreatedAt>{createdAt}</CreatedAt>
      <Content>{content}</Content>

      <Buttons>
        <button onClick={() => handleEditComment(id)}>수정</button>
        <button onClick={() => handleDeleteComment(id)}>삭제</button>
      </Buttons>

      <hr />
    </Item>
  );
};

const Item = styled.li`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Buttons = styled.div`
  text-align: right;
  margin: 10px 0;
  & > button {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default Comment;
