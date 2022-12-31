import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Player from "./ele/Player";
import {
  getAllVideo,
  initSearch,
  searchTag,
} from "../../redux/modules/videoSlice";
import { StLabel } from "../../UI/StIndex";

const Intro = () => {
  const { allVideos, searchedVideo } = useSelector((state) => state.videoSlice);
  const target = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    let observer = new IntersectionObserver(
      (e, io) => {
        e.forEach((e) => {
          if (e.isIntersecting) {
            io.unobserve(e.target);
            setTimeout(() => {
              const num = allVideos?.length - 1;
              if (allVideos) {
                const id = allVideos[num].postId;
                dispatch(getAllVideo(id));
              } else if (!allVideos) {
                dispatch(getAllVideo(0));
              }
            }, 500);
          }
        });
      },
      { threshold: 0.7 }
    );
    if (target.current) observer.observe(target.current);
    return () => observer.disconnect();
  }, [allVideos]);

  const searchByTagHandler = (e) => {
    dispatch(searchTag(e.target.name));
  };
  return (
    <StAllBox>
      <section>
        <StLabelContainer>
          <StLabel
            onClick={() => {
              dispatch(initSearch());
            }}
            name="전체"
          >
            전체
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="강아지">
            강아지
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="반려동물">
            반려동물
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="운동">
            운동
          </StLabel>
          <StLabel onClick={searchByTagHandler} name="패션">
            패션
          </StLabel>
        </StLabelContainer>
      </section>
      <section>
        <StAllVideoContainer>
          {searchedVideo === null ? (
            allVideos?.map((video, i) => {
              return <Player key={`player${i}`} video={video} />;
            })
          ) : (
            <></>
          )}
          {searchedVideo?.length === 0 ? (
            <p>검색결과가 없습니다.</p>
          ) : (
            searchedVideo?.map((video) => {
              return <Player key={`player${video.postId}`} video={video} />;
            })
          )}
        </StAllVideoContainer>
        <StTarget ref={target}></StTarget>
      </section>
    </StAllBox>
  );
};

export default Intro;

const StAllVideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  column-gap: 30px;
  row-gap: 10px;
  margin: 0 24px;
`;

const StLabelContainer = styled.article`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  gap: 5px;
`;
const StAllBox = styled.div`
  position: relative;
`;
const StTarget = styled.input`
  position: absolute;
  bottom: 10%;
  z-index: -9999;
  border: none;
  background-color: whitesmoke;
`;
