import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import Router, { useRouter } from "next/router";

import Heart from "react-heart";

import styles from "../../styles/card.module.css";

import { AuthContext } from "../AuthContext";

import { useHttpClient } from "../httpHooks";

function CardMain(props) {
  const auth = useContext(AuthContext);

  const { sendRequest, isLoading } = useHttpClient();

  const [isClick, setClick] = useState(false);
  const [likeCount, readCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const checkLike = async () => {
      if (props.like && props.like.find((ele) => ele == auth.userId)) {
        setClick(true);
      } else {
        setClick(false);
      }
    };

    const countLike = async () => {
      try {
        const count = await sendRequest(
          `http://localhost:5000/api/places/like/count/${props.pid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        readCount(count.count);
      } catch (err) {
        console.log(err);
      }
    };

    countLike();
    checkLike();
  }, []);

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.pid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const LikeBtn = async () => {
    if (!isClick) {
      try {
        let a = await sendRequest(
          `http://localhost:5000/api/places/like`,
          "POST",
          JSON.stringify({
            postId: props.pid,
            userId: auth.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        if (a.message) {
          setClick(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (isClick) {
      setClick(false);
      try {
        await sendRequest(
          `http://localhost:5000/api/places/dislike`,
          "POST",
          JSON.stringify({
            postId: props.pid,
            userId: auth.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className={styles.cardHomeMain}>
        <div className={styles.cardHomeImage}>
          <Image
            src={`http://localhost:5000/${props.img}`}
            height={320}
            width={560}
          />
        </div>
        <div className={styles.cardHomeContent}>
          <h1>{props.title}</h1>
          <p>{props.desc}</p>
          <iframe
            className={styles.mapShow}
            src={`https://maps.google.com/maps?q=${props.lat},${props.long}&zoom=12&hl=es;&output=embed`}
            height={200}
            width={300}
          />
          {auth.userId == props.user && (
            <button onClick={deleteHandler} className={styles.myPostDel}>
              Delete
            </button>
          )}
          <div className={styles.likeHeart}>
            {auth.userId && auth.userId != props.user && (
              <Heart
                style={{ width: "2rem" }}
                isActive={isClick}
                onClick={LikeBtn}
              />
            )}
            {auth.userId == props.user && (
              <span
                style={{
                  marginTop: "-10vh",
                }}
              >
                {likeCount && likeCount ? likeCount : 0} Likes
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardMain;
