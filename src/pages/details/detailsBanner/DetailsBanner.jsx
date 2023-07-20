/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./style.scss"
import useFetch from "../../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import dayjs from 'dayjs'
import Genres from "../../../components/genres/Genres"
import CircleRating from "../../../components/circleRating/CircleRating"
import { PlayIcon } from './PlayButton'
import { VideoPopup } from '../../../components/videoPopup/VideoPopup'

export const DetailsBanner = ({video,crew}) => {

  const [show,setShow]=useState(false)
  const[videoId, setVideoId]=useState(null)


  const {mediaType,id}=useParams()
  const {data,loading}=useFetch(`/${mediaType}/${id}`);

  const url=useSelector((store)=>store.home.url)

  const genresName=data?.genres?.map((g)=> g.id)

  const director=crew?.filter((f)=>f.job=== "Director")
  const writer=crew?.filter((f)=> f.job=== "Screenplay" || f.job==="Writer")

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

  return (
    <div className="detailsBanner">
        {!loading ? (
            <div>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path}/>
              </div>
              <div className='opacity-layer'></div>
              <ContentWrapper>
                <div className='content'>
                  <div className="left">
                    {data?.poster_path ? (
                      <Img src={url.poster + data?.poster_path} className="posterImg"/>
                    ):(
                      <Img src={PosterFallback} className="posterImg"/>
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">
                      {data?.tagline}
                    </div>
                    <Genres data={genresName}/>
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)}/>
                      <div className="playbtn" onClick={()=> {
                        setShow(true)
                        setVideoId(video.key)
                        }}>
                      <PlayIcon/>
                      <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">
                        Overview
                      </div>
                      <div className="description">{data?.overview}</div>
                    </div>
                    <div className="info">
                      {data?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:{" "}</span>
                          <span className="title">
                            {data?.status}
                          </span>
                        </div>
                      )}
                      {data?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:{" "}</span>
                          <span className="title">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime:{" "}</span>
                          <span className="title">
                            {toHoursAndMinutes(data?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director:{" "}
                        </span>
                        <span className="text">
                          {director?.map((d,i)=>(
                            <span key={i}>
                              {d.name}
                              {director?.length-1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer:{" "}
                        </span>
                        <span className="text">
                          {writer?.map((d,i)=>(
                            <span key={i}>
                              {d.name}
                              {writer?.length-1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Creator:{" "}
                        </span>
                        <span className="text">
                          {data?.created_by?.map((d,i)=>(
                            <span key={i}>
                              {d.name}
                              {data?.created_by?.length !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                  </div>
                </div>
                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId}/>
              </ContentWrapper>
              </div>
        ) : (
            <div className="detailsBannerSkeleton">
                <ContentWrapper>
                    <div className="left skeleton"></div>
                    <div className="right">
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                        <div className="row skeleton"></div>
                    </div>
                </ContentWrapper>
            </div>
        )}
    </div>
);
};