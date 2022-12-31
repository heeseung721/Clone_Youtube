import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import StButton from "./../../UI/StButton";
import KakaoImg from "../../assets/kakao.png";
import KakaoLogin from "./KakaoLogin";
import { KAKAO_AUTH_URL } from "./KakaoLogin";

import { useDispatch, useSelector } from "react-redux";
import { logIn, kakaoInfo } from "../../redux/modules/signSlice";

const SignIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    for (const property in input) {
      if (input[property].trim() === "") {
        window.alert("빈 정보를 입력해주세요");
        return;
      }
    }

    const res = await dispatch(logIn(input));

    if (res.meta.requestStatus === "rejected") {
      window.alert(res.payload);
    } else {
      window.alert(res.payload);
      navigate("/");
    }
  };
  return (
    <StWrapper>
      <StForm onSubmit={onSubmitHandler}>
        <h2>로그인</h2>
        <StInputContainer>
          <StFormInput
            placeholder="이메일"
            name="email"
            onChange={changeInputHandler}
          ></StFormInput>
          <StFormInput
            autoComplete="off"
            placeholder="비밀번호"
            name="password"
            type="password"
            onChange={changeInputHandler}
          ></StFormInput>
        </StInputContainer>
        <StBtnContainer>
          <StButton mode={"pr"}>로그인</StButton>
          <Link to="/signup">
            <StButton mode={"second"}>회원가입</StButton>
          </Link>
        </StBtnContainer>
        <StDivider />
        <StSocialContainer>
          <a href={KAKAO_AUTH_URL}>
            <StKakaoDiv>
              <img
                src={KakaoImg}
                alt="카카오 로그인"
                width="32px"
                height="32px"
              />
            </StKakaoDiv>
          </a>
        </StSocialContainer>
      </StForm>
    </StWrapper>
  );
};

const StWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StInputContainer = styled.div`
  margin: 38px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StForm = styled.form`
  margin: 0 auto;
  width: 450px;
  height: 500px;
  border: 1px solid ${(props) => props.theme.colors.gray};
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

const StKakaoDiv = styled.div`
  background-color: rgb(251, 229, 77);
  width: 32px;
  height: 32px;
  border-radius: 70%;
  overflow: hidden;
  border: none;
`;

const StDivider = styled.div`
  content: "";
  margin: 15px 0;
  width: 70%;
  height: 1px;
  background-color: #d9d9d9;
`;

const StSocialContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SignIn;
