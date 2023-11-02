import React, { useContext } from "react";

import styles from "../../styles/userCard.module.css";

import Image from "next/image";

import { useRouter } from "next/router";

import { AuthContext } from "../AuthContext";

function UserCard(props) {
  const router = useRouter();

  const auth = useContext(AuthContext);

  const userClickHandler = () => {
    auth.clickedUserId = props.uid;
    router.push(`/userpost/${auth.clickedUserId}`);
  };

  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={userClickHandler}>
        <div className={styles.mainUserCard}>
          <div className={styles.userImg}>
            <Image
              alt="User Image"
              src={`http://localhost:5000/${props.img}`}
              width={160}
              height={160}
            />
          </div>
          <h1>{props.username}</h1>
          <p>{props.desc}</p>
          <p>Total Places : {props.place.length}</p>
        </div>
      </div>
    </>
  );
}

export default UserCard;
