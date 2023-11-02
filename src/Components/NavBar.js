import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";

import Image from "next/image";
import Link from "next/link";

import logo from "../../public/Nav/Rectangle 9.svg";

import { AuthContext } from "./AuthContext";
import { useHttpClient } from "./httpHooks";

import { BiLogOut } from "react-icons/bi";

function NavBar() {
  const auth = useContext(AuthContext);

  const onLogOutHandler = () => {
    auth.logout();
  };
  const [user, loadedUser] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/user"
        );
        loadedUser(
          responseData.users.filter(function (i, n) {
            return i.id == auth.userId;
          })
        );
      } catch (err) {}
    };
    {
      auth.isLoggedIn && fetchUser();
    }
  }, [sendRequest]);

  return (
    <>
      <div className={styles.navMain}>
        <div title="Home" className={styles.navLogo}>
          <Image src={logo} alt="Logo" width={90} height={90} />
          <Link href={"/"} style={{ all: "unset", cursor: "pointer" }}>
            <h1>GeoBook</h1>
          </Link>
        </div>
        <div className={styles.navButtons}>
          {auth.isLoggedIn && (
            <Link href={"/createpost"}>
              <button className={styles.btn1}>Add New</button>
            </Link>
          )}

          {auth.isLoggedIn && user && (
            <Link href={`/mypost`}>
              {user &&
                user.map((img) => (
                  <Image
                    alt="user"
                    className={styles.btn2}
                    src={`http://localhost:5000/${img.img}`}
                    width={65}
                    height={65}
                  />
                ))}
            </Link>
          )}

          {!auth.isLoggedIn && (
            <Link href={"/signup"}>
              <button className={styles.btn1}>SignUp</button>
            </Link>
          )}

          {!auth.isLoggedIn && (
            <Link href={"/login"}>
              <button className={styles.btn3}>LogIn</button>
            </Link>
          )}
        </div>
      </div>
      {auth.isLoggedIn && (
        <div className={styles.lOutBtn}>
          <button onClick={onLogOutHandler} title="LogOut">
            <BiLogOut />
          </button>
        </div>
      )}
    </>
  );
}

export default NavBar;
