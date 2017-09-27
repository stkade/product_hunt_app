import { RECEIVE_PRODUCT, RECEIVE_COMMENT } from '../actions/product_actions';
import { merge } from 'lodash';

const defaultState = {
    byId: {
    },
    allIds: [],
    byParentId: {}
  };

const commentsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_PRODUCT:
      newState = Object.assign({}, defaultState);
      let comments = Object.values(action.data.comments);

      comments.map( (comment) => {
       if (!comment.parentCommentId) {
         newState.byId[comment.id] = comment;
         newState.byParentId[comment.id] = [];
       }
      });
      comments.map( (comment) => {
        if (comment.parentCommentId) {
          newState.byId[comment.id] = comment;
          newState.byParentId[comment.parentCommentId].push(comment);
        }
      });
      newState.allIds = action.data.commentIds;
      return newState;
    case RECEIVE_COMMENT:
      let comment = action.comment;
      newState.byId[comment.id] = comment;
      newState.allIds.unshift(comment.id);
      if (!comment.parentCommentId) {
        newState.byParentId[comment.id] = [];
      } else {
        newState.byParentId[comment.parentCommentId].unshift(comment);
      }
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;