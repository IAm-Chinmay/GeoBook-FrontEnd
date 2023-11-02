import React, { useEffect, useState, useContext } from "react";

import UserCard from "../Card/UserCard";
import { useHttpClient } from "../httpHooks";
import { AuthContext } from "../AuthContext";

import { ColorRing } from "react-loader-spinner";

function HomeMain() {
  const [user, loadedUser] = useState();
  const { sendRequest, isLoading } = useHttpClient();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          // "http://localhost:5000/api/user"
          "http://localhost:5000/api/user"
        );
        loadedUser(
          responseData.users.filter(function (i, n) {
            return i.id != auth.userId;
          })
        );
      } catch (err) {}
    };
    fetchUser();
  }, [sendRequest]);

  // const success = (position) => {
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
  // };

  // const err = (err) => {
  //   console.log(err);
  // };

  // navigator.geolocation.getCurrentPosition(success, err);

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "40vh",
            left: "80vh",
          }}
        >
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#f59547", "#f55347", "#54b53c", "#3c80b5", "#9a45d6"]}
          />
        </div>
      )}
      <div
        style={{
          marginLeft: "72vh",
          marginTop: "5vh",
          width: "fit-content",
        }}
      >
        {user &&
          user.map((u) => (
            <UserCard
              uid={u.id}
              img={u.img}
              username={u.username}
              desc={u.Udesc}
              place={u.places}
            />
          ))}
      </div>
    </>
  );
}

export default HomeMain;
