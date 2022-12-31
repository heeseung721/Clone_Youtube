import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  deleteComment,
  patchComment,
} from "../../../redux/modules/commentSlice";

const Comment = ({ el, videoId }) => {
  const [updating, setUpdating] = useState();
  const dispatch = useDispatch();
  const [upComment, setUpComment] = useState("");
  return (
    <StWrapper>
      <StP>{el.nickname}</StP>
      {updating ? (
        <input
          type="text"
          value={upComment}
          onChange={(e) => setUpComment(e.target.value)}
        ></input>
      ) : (
        <StP>{el.comment}</StP>
      )}
      <StP>{el.createdAt}</StP>
      <div>
        {updating ? (
          <button
            onClick={() => {
              dispatch(
                patchComment({
                  postId: videoId,
                  commentId: el.commentId,
                  comment: upComment,
                })
              );
              setUpdating(false);
            }}
          >
            완료
          </button>
        ) : (
          <button
            onClick={() => {
              setUpdating(true);
            }}
          >
            수정
          </button>
        )}
        <button
          onClick={() => {
            dispatch(
              deleteComment({ postId: videoId, commentId: el.commentId })
            );
          }}
        >
          삭제
        </button>
      </div>
    </StWrapper>
  );
};

export default Comment;

const StWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StP = styled.p`
  height: 2rem;
  box-shadow: 0px 0px 3px #eee;
  border: none;
  border-bottom: 1px solid #ccc;
  width: 40%;
  margin: 0 auto;
  filter: blur(0.5px);
  &:hover {
    transform: scale(1.01);
    filter: blur(0);
  }
`;
