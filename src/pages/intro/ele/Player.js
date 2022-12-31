import React, { useState } from "react";
import ReactPlayer from "react-player";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Player = ({ video }) => {
  const [play, setPlay] = useState(false);
  return (
    <StPlayerAll>
      <NavLink
        to={`/detail/${video.postId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <StPlyerContainer
          onMouseEnter={() => setPlay(true)}
          onMouseLeave={() => setPlay(false)}
        >
          {!play ? (
            <StThumbnail src={video.thumbnail} alt={video.title} />
          ) : (
            <ReactPlayer
              className="react-player"
              url={video.compVid}
              height="100%"
              width="100%"
              playing={true}
              muted={true}
              controls={true}
            />
          )}
        </StPlyerContainer>
        <StContainerRow>
          <StProfileImgDiv>
            <img
              alt="profile"
              src={video.profile}
              width="32px"
              height="32px"
              border-radius="50%"
              object-fit="cover"
            />
          </StProfileImgDiv>
          <StContainerCol>
            <StTitle>{video.title}</StTitle>
            <StNickName>작성자 : {video.nickname}</StNickName>
            <StCreateAt>등록일자 : {video.ago}</StCreateAt>
            <StViewCount>조회수 : {video.view}</StViewCount>
          </StContainerCol>
        </StContainerRow>
      </NavLink>
    </StPlayerAll>
  );
};

const StPlayerAll = styled.div`
  background: white;
  &:hover {
    z-index: 20;
    transform: scale(1.3);
    box-shadow: 0 0 3px #333;
    border-radius: 12px;
  }
`;

const StPlyerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  height: 180px;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
`;

const StThumbnail = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
`;

const StProfileImgDiv = styled.div`
  width: 40px;
  height: 32px;
  margin: 10px 10px 0 10px;
  border-radius: 50%;
  overflow: hidden;
`;

const StContainerCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
`;

const StContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  padding: 5px 0;
`;

const StNickName = styled.div``;

const StCreateAt = styled.div``;

const StViewCount = styled.div``;
export default Player;
