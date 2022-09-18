import { useDispatch, useSelector } from 'react-redux';
import { submitNewComment, fetchPaginatedData, setComment, editComment } from '../store/comment-slice';
import { setCurrentPage } from '../store/page-slice';

import styled from 'styled-components';

function Form() {
  const dispatch = useDispatch();

  const comment = useSelector((state) => state.comment.comment);
  const commentStatus = useSelector((state) => state.comment.commentStatus);

  const commentPerPage = useSelector((state) => state.page.commentPerPage);
  const currentPage = useSelector((state) => state.page.currentPage);

  const handleCommentChange = (e) => {
    const { value, name } = e.target;
    dispatch(setComment({ ...comment, [name]: value }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (commentStatus === 'EDIT') {
      dispatch(editComment(comment.id, comment));
    }

    if (commentStatus === 'DEFAULT') {
      dispatch(submitNewComment(comment));
      dispatch(setCurrentPage(1));
    }

    dispatch(fetchPaginatedData(commentPerPage, currentPage));
    dispatch(setComment(''));
  };

  return (
    <FormStyle onSubmit={handleSubmitComment}>
      <input
        type="text"
        name="profile_url"
        value={comment.profile_url || ''}
        onChange={handleCommentChange}
        placeholder="https://picsum.photos/id/1/50/50"
      />
      <br />

      <input
        type="text"
        name="author"
        value={comment.author || ''}
        onChange={handleCommentChange}
        placeholder="작성자"
        required
      />
      <br />

      <textarea
        name="content"
        value={comment.content || ''}
        onChange={handleCommentChange}
        placeholder="내용"
        required
      ></textarea>
      <br />

      <input type="text" name="createdAt" value={comment.createdAt || ''} onChange={handleCommentChange} />
      <br />

      <button>등록</button>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  padding: 0 10px;
  margin-bottom: 50px;

  textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }

  input {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }

  button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

export default Form;
