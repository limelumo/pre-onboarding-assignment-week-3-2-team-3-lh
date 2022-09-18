import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const randomNum = Math.floor(Math.random() * 200);

const handleCreateDate = () => {
  const getStringDate = (date) => date.toISOString().slice(0, 10);
  return getStringDate(new Date());
};

const initialCommentState = {
  totalComments: 0,
  commentList: [],
  comment: {
    id: null,
    profile_url: `https://picsum.photos/id/${randomNum}/50/50`,
    author: '',
    content: '',
    createdAt: handleCreateDate(),
  },
  commentStatus: 'DEFAULT',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {
    setTotalComments(state, action) {
      state.totalComments = action.payload;
    },
    setCommentList(state, action) {
      state.commentList = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
    setCommentStatus(state, action) {
      state.commentStatus = action.payload;
    },
  },
});

export const { setTotalComments, setCommentList, setComment, setCommentStatus } = commentSlice.actions;

const Axios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
  },
  paramsSerializer: function (params) {
    return new URLSearchParams(params).toString();
  },
});

export const fetchCommentListData = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: '/comments',
        method: 'GET',
      });

      dispatch(setTotalComments(data.length));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchPaginatedData = (commentPerPage, currentPage) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: '/comments',
        method: 'GET',
        params: {
          _limit: commentPerPage,
          _page: currentPage,
          _order: 'desc',
          _sort: 'id',
        },
      });

      dispatch(setCommentList(data));
      console.log('here');
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchEditCommentData = (commentId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: `/comments/${commentId}`,
        method: 'GET',
      });

      dispatch(setComment(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const submitNewComment = (newComment) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: '/comments',
        method: 'POST',
        data: newComment,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const editComment = (commentId, comment) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: `/comments/${commentId}`,
        method: 'PUT',
        data: comment,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios({
        url: `/comments/${commentId}`,
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
};

export default commentSlice.reducer;
