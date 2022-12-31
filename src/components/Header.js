import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/modules/signSlice";
import { initSearch } from "../redux/modules/videoSlice";
import youtube from "../assets/youtube.png";
import AddForm from "../pages/intro/ele/AddForm";
import Modal from "../pages/intro/ele/Modal";
import {
  AiOutlineSearch,
  AiOutlineLogout,
  AiOutlineVideoCameraAdd,
} from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isLogedIn } = useSelector((state) => state.signSlice);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleModal = () => {
    setModal((prev) => !prev);
  };

  const enterKeyHandler = (e) => {
    if (window.event.keyCode === 13) {
      setSearchValue("");
      navigate(`/search/${searchValue}`);
    }
  };

  const enterHandler = (e) => {
    setSearchValue("");
    navigate(`/search/${searchValue}`);
  };

  const goSignIn = () => {
    navigate("/signin");
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  return (
    <StHeaderWrapper>
      <StHeaderContainer>
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            gap: "4px  ",
            alignItems: "center",
            display: "flex",
          }}
        >
          <StIcon src={youtube} alt="icon" />
          <StH3 onClick={() => dispatch(initSearch())}>JJabtube</StH3>
        </NavLink>

        <StSearchBox>
          <StInput
            type="text"
            placeholder="검색"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={enterKeyHandler}
          ></StInput>
          <StSearchBtn onClick={enterHandler}>
            <AiOutlineSearch size="24" />
          </StSearchBtn>
        </StSearchBox>
        <StSignBox>
          {isLogedIn ? (
            <>
              <StSmButton onClick={onToggleModal}>
                <AiOutlineVideoCameraAdd size="24" />
              </StSmButton>
              <Modal modal={modal} closeModal={onToggleModal}>
                <AddForm onToggleModal={onToggleModal}></AddForm>
              </Modal>
              <StSmButton onClick={() => dispatch(logOut())}>
                <AiOutlineLogout size="24" />
              </StSmButton>
            </>
          ) : (
            <>
              {/* <StSingUpBtn onClick={goSignUp}><IoPersonAddSharp size="24"/></StSingUpBtn> */}
              <StSingIn onClick={goSignIn}>
                <IoPersonCircleOutline size="24" color="rgb(70, 111, 217)" />
                로그인
              </StSingIn>
            </>
          )}
        </StSignBox>
      </StHeaderContainer>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 70px;
  align-items: center;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const StHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
`;

const StH3 = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: black;
  font-family: "Heycomic";
`;

const StIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const StSearchBox = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;
  height: 42px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 30px 30px 30px 30px;
`;

const StInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  padding-left: 15px;
  &:focus {
    box-shadow: 1px ${(props) => props.theme.colors.blue} inset;
    border-radius: 30px 0 0 30px;
  }
`;

const StSearchBtn = styled.button`
  width: 56px;
  border: transparent;
  border-radius: 0 40px 40px 0;
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

const StSmButton = styled.button`
  padding: 0 9px;
  border-radius: 12px;
  border: none;
  background-color: white;
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

const StSingIn = styled.div`
  display: flex;
  padding: 0 6px;
  gap: 4px;
  font-size: 14px;
  border-radius: 40px;
  align-items: center;
  color: ${(props) => props.theme.colors.blue};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  cursor: pointer;
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

const StSignBox = styled.div`
  display: flex;
  gap: 14px;
`;
