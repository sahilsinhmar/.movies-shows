/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infiniteScrollLoading, setInfiniteScrollLoading] = useState(false);
  const { mediaType } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, { page: pageNum }).then((res) => {
      setData(res);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    setInfiniteScrollLoading(true); 
    fetchDataFromApi(`/discover/${mediaType}`, { page: pageNum + 1 }).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
      setInfiniteScrollLoading(false); 
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, [mediaType]);

  return (
    <div className="mediaExplorePage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum < data?.total_pages} 
                loader={<Spinner />}
              >
                {data?.results.map((item, index,id) => {
                  if (item.media_type === "person") return null;
                  return <MovieCard key={index} data={item} fromSearch={true} mediaType={mediaType} id={id} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default Explore;
