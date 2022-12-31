import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchPost from "./ele/SearchPost";
import styled from "styled-components";
import {
  detailFilterDay,
  detailFilterMonth,
  detailFilterYear,
  filterView,
  fitlerTitle,
  searchTitle,
} from "../../redux/modules/videoSlice";

const Search = () => {
  const { searchedVideo, searchedFilterVideo } = useSelector(
    (state) => state.videoSlice
  );
  const { searchValue } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchTitle(searchValue));
  }, [searchValue]);

  const [show, setShow] = useState(false);

  return (
    <>
      <StWrap>
        <StBtn
          onClick={() => {
            setShow(!show);
          }}
        >
          정렬
        </StBtn>
        {show && (
          <StFilter>
            <StWrapBtn>
              <StInnerTitle>정렬 기준</StInnerTitle>
              <StBtn onClick={() => dispatch(fitlerTitle())}>제목순</StBtn>
              <StBtn onClick={() => dispatch(filterView())}>조회수</StBtn>
            </StWrapBtn>
            <StWrapBtn>
              <StInnerTitle>정렬 기준</StInnerTitle>
              <StBtn onClick={() => dispatch(detailFilterDay())}>오늘</StBtn>
              <StBtn onClick={() => dispatch(detailFilterMonth())}>
                이번 달
              </StBtn>
              <StBtn onClick={() => dispatch(detailFilterYear())}>올해</StBtn>
            </StWrapBtn>
          </StFilter>
        )}
      </StWrap>

      <StSearchResult>
        {searchedFilterVideo
          ? searchedFilterVideo?.map((video, i) => (
              <SearchPost key={`search${i}`} video={video} />
            ))
          : searchedVideo?.map((video, i) => (
              <SearchPost key={`search${i}`} video={video} />
            ))}
      </StSearchResult>
    </>
  );
};

export default Search;

const StWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #ccc;
  padding: 5px;
`;

const StBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: white;
  color: black;
  border: none;
  box-shadow: inset 0px 0px 6px #333;
  border-radius: 6px;
`;

const StWrapBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
`;

const StInnerTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 10px 0 0 0;
  text-align: center;
`;

const StFilter = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;

const StSearchResult = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`;
