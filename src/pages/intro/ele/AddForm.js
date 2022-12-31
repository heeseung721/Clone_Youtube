import { async } from "q";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useInputItem from "../../../hooks/useInputItem";
import { postVideo } from "../../../redux/modules/videoSlice";
import { StButton } from "../../../UI/StIndex";

const AddForm = ({ onToggleModal }) => {
  const { input, onChangeHandler, reset } = useInputItem();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [video, setVideo] = useState();

  const formData = new FormData();
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { title, content, tag } = input;
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", tag);
    formData.append("video", video);

    dispatch(postVideo(formData));
    onToggleModal();
    navigate("/");
    reset();
  };

  const onCloseModal = (e) => {
    e.preventDefault();
    onToggleModal();
    reset();
  };
  return (
    <>
      <StContainer>
        <StContentContainer>
          <label>제목</label>
          <input name="title" value={input.title} onChange={onChangeHandler} />
          <label>내용</label>
          <StInput
            name="content"
            value={input.content}
            onChange={onChangeHandler}
          />
          <label>태그</label>
          <input onChange={onChangeHandler} name="tag" value={input.tag} />
        </StContentContainer>
        <StVideoContainer>
          <label>영상 업로드</label>
          <input
            name="video"
            accept="video/*, video/mp4, video/mkv, video/x-m4v"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
            type="file"
          />
        </StVideoContainer>
        <StButtonWrapper>
          <StButton mode={"pr"} onClick={onSubmitHandler}>
            추가하기
          </StButton>
          <StButton mode={"second"} onClick={onCloseModal}>
            취소
          </StButton>
        </StButtonWrapper>
      </StContainer>
    </>
  );
};

export default AddForm;

const StContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const StContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80%;
`;

const StInput = styled.input`
  boreder: 1px solid ${(props) => props.theme.colors.lightGray};
  height: 50px;
  &:focus {
    boreder: 1px solid ${(props) => props.theme.colors.blue};
  }
`;
const StInputText = styled.input`
  boreder: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const StVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 80%;
`;
const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 8px;
`;
