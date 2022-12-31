import React, { useState, useRef } from "react";
import styled from "styled-components";
import profile from "../../assets/profile.png";

import { useDispatch } from "react-redux";
import { signUp, dupEmailCheck } from "./../../redux/modules/signSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [profileImg, setProfileImg] = useState({});
  const [previewImg, setPreviewImg] = useState("");
  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const imgRef = useRef();
  const { dupCheck } = useSelector((state) => state.signSlice);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeImgHandler = (e) => {
    const profileImg = e.target.files[0];

    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    setProfileImg(profileImg);
  };

  const __dupEmailCheck = async (e) => {
    e.preventDefault();

    if (input.email) {
      const res = await dispatch(dupEmailCheck(input.email));
      if (res.meta.requestStatus === "fulfilled") {
        window.alert("사용가능한 이메일 입니다");
      } else {
        window.alert("이미 존재하는 이메일 입니다.");
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    for (const property in input) {
      if (input[property].trim() === "") {
        window.alert("빈 정보를 입력해주세요");
        return;
      }
    }

    if (dupCheck) {
      const formData = new FormData();
      formData.append("emailValidate", true);

      for (const property in input) {
        formData.append(`${property}`, input[property]);
      }

      formData.append("profileImg", profileImg);

      const res = await dispatch(signUp(formData));

      if (res.meta.requestStatus === "fulfilled") {
        window.alert("회원가입 성공!");
        navigate("/");
      } else if (input.password !== input.passwordConfirm) {
        window.alert("패스워드가 일치하지 않습니다");
        return;
      } else {
        return;
      }
    } else {
      window.alert("이메일 중복 체크 해주세요");
      return;
    }
  };

  return (
    <Wrapper>
      <StForm onSubmit={onSubmitHandler}>
        <h2>회원가입</h2>
        <InputContainer>
          <StProfileImgDiv>
            <img
              alt="profile"
              src={previewImg ? previewImg : profile}
              width="32px"
              height="32px"
              border-radius="50%"
              object-fit="cover"
            />
          </StProfileImgDiv>
          <StImgLabel htmlFor="profileImg">프로필 이미지 추가</StImgLabel>
          <StImgInput
            id="profileImg"
            ref={imgRef}
            accept="image/*"
            name="profileImg"
            type="file"
            onChange={changeImgHandler}
          />
          <StBtnContainer>
            <StFormInput
              placeholder="이메일"
              name="email"
              onChange={changeInputHandler}
            ></StFormInput>
            <StDupCheckButton type="button" onClick={__dupEmailCheck}>
              중복체크
            </StDupCheckButton>
          </StBtnContainer>
          <StFormInput
            placeholder="닉네임"
            name="nickname"
            onChange={changeInputHandler}
          ></StFormInput>
          <StFormInput
            autoComplete="off"
            placeholder="비밀번호"
            name="password"
            type="password"
            onChange={changeInputHandler}
          ></StFormInput>
          <StFormInput
            autoComplete="off"
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            type="password"
            onChange={changeInputHandler}
          ></StFormInput>
        </InputContainer>
        <StPrimaryLgButton>회원가입</StPrimaryLgButton>
      </StForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin: 38px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

const StForm = styled.form`
  width: 450px;
  height: 600px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StFormInput = styled.input`
  width: 320px;
  height: 56px;
  color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 5px;
  padding-left: 10px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue};
  }
  ::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const StImgInput = styled.input`
  display: none;
`;

const StProfileImgDiv = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

const StImgLabel = styled.label`
  padding: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;

const StBtnContainer = styled.div`
  width: 320px;
  position: relative;
`;

const StDupCheckButton = styled.button`
  position: absolute;
  right: 0;
  width: 65px;
  height: 56px;
  color: white;
  background-color: ${(props) => props.theme.colors.blue};
  border: none;
  border-radius: 0 5px 5px 0;
  &:hover {
    background: rgb(49, 101, 195);
  }
`;

const StPrimaryLgButton = styled.button`
  width: 320px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.blue};
  &:hover {
    background: rgb(49, 101, 195);
  }
`;

export default SignUp;
