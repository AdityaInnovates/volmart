import React, { useEffect, useContext } from "react";
import logo from "./Login_img.png";
import $ from "jquery";
// import { useNavigate } from "react-router-dom";
import { validateform } from "../../jsTool/formvalidate";
import { User } from "../../context/allcontexts";
import { checkemail } from "../../jsTool/validateEmail";
import { useRouter } from "next/router";
import Head from "next/head";

const GetUser = () => {
  const router = useRouter();
  let user = useContext(User);
  // let navi = useNavigate();
  useEffect(() => {
    if (user.login) {
      // navi("/", { replace: true });
      router.push("/");
    }
  });
  function signupsubmit(data) {
    $.ajax({
      type: "post",
      url: "/api/auth/signup",
      data,
      success: (data) => {
        console.log(data);
        if (data.length < 200) {
          alert(data);
        } else {
          localStorage.setItem("token", data);
          user.saveuserinfo();
          // navi("/", { replace: true });
          // router.push("/");
        }
      },
      error: (err) => alert(err.responseText),
    });
  }
  function verifysubmit(e) {
    let datatosend = {
      name: $(".namesignupcl").val(),
      email: $(".emailsignupcl").val(),
      contact: $(".contactsignupcl").val(),
      password: $(".passwordsignupcl").val(),
    };
    $(".spannerrsignup").hide();
    switch (validateform(datatosend)) {
      case "success":
        signupsubmit(datatosend);
        break;
      case "nameerr":
        $(".spannerrsignup").eq(0).show();
        break;

      case "emailerr":
        $(".spannerrsignup").eq(1).show();
        break;
      case "emaildoterr":
        $(".spannerrsignup").eq(1).show();
        break;

      case "contacterr":
        $(".spannerrsignup").eq(2).show();
        break;
      case "passworderr":
        $(".spannerrsignup").eq(3).show();
        break;
      default:
        break;
    }
  }
  function loginsubmit(data) {
    $.ajax({
      type: "post",
      url: "/api/auth/login",
      data,
      success: (data) => {
        if (data.length < 200) {
          alert(data);
        } else {
          localStorage.setItem("token", data);
          user.saveuserinfo();
          router.push("/");
          // navi("/", { replace: true });
        }
      },
      error: (err) => alert(err.responseText),
    });
  }
  function verifylogin(e) {
    let datatosend = {
      email: $(".emailinplogin").val(),
      password: $(".passinplogin").val(),
    };
    $(".spannerrlogin").hide();
    if (
      checkemail($(".emailinplogin").val()) &&
      $(".passinplogin").val().length > 7
    ) {
      loginsubmit(datatosend);
    } else if (!checkemail($(".emailinplogin").val())) {
      $(".spannerrlogin").eq(0).show();
    } else if ($(".passinplogin").val().length < 8) {
      $(".spannerrlogin").eq(1).show();
    }
  }
  return (
    <div
      style={{
        background: "linear-gradient(#141e30, #243b55)",
        height: "90.4vh",
        width: "100%",
      }}
    >
      <Head>
        <title>Login - Volmart | Shop For SmartBuyers</title>
        <meta name="description" content="Created By Aditya" />
      </Head>
      <div className="outerall-login_signup">
        <div className="toggel-grp">
          <input
            type="checkbox"
            name=""
            id="asd"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.checked) {
                e.target.disabled = true;
                document.title = "Signup - Volmart | Shop For SmartBuyers";
                $(".login-box")
                  .eq(0)
                  .slideToggle(() => {
                    $(".login-box")
                      .eq(1)
                      .slideToggle(() => {
                        e.target.disabled = false;
                      });
                  });
              } else {
                e.target.disabled = true;
                document.title = "Login - Volmart | Shop For SmartBuyers";
                $(".login-box")
                  .eq(1)
                  .slideToggle(() => {
                    $(".login-box")
                      .eq(0)
                      .slideToggle(() => {
                        e.target.disabled = false;
                      });
                  });
              }
            }}
          />
          <label
            className="w-16 rounded-2xl h-5 bg-white mx-auto relative toggle-btn-cl cursor-pointer mb-2 flex "
            htmlFor="asd"
          >
            <h3 className=" text-sky-50 relative right-12 bottom-1 login-txt-toggle ">
              Login
            </h3>
            <h3 className=" text-sky-50 relative left-8 bottom-1 signup-txt-toggle ">
              Signup
            </h3>
          </label>
        </div>
        <div className="flex ">
          <div>
            {/* <div className="img-shadow"> */}
            <div>
              <img
                className=""
                style={{
                  width: "400px",
                  borderTopLeftRadius: "1rem",
                  borderBottomLeftRadius: "1rem",
                }}
                src={logo.src}
                alt=""
              />
            </div>
          </div>
          <div className="login-box">
            <h2>Login</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifylogin(e);
              }}
            >
              <div className="user-box flex">
                <input type="text" name="" required className="emailinplogin" />
                <label>Email</label>
                <span className=" text-red-500 absolute mt-11 hidden font-normal spannerrlogin">
                  <h5>Please Enter A valid Email!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input
                  type="password"
                  name=""
                  required
                  className="passinplogin"
                />
                <label>Password</label>
                <span className=" text-red-500 absolute mt-11 hidden font-normal spannerrlogin">
                  <h5>Must Be More Than 7 Digits</h5>
                </span>
              </div>
              <button>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>
          </div>
          {/*For Signup Screen */}
          <div className="login-box hidden" style={{ padding: "11px 40px" }}>
            <h2>Signup</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifysubmit(e);
              }}
            >
              <div className="user-box flex">
                <input type="text" name="" required className="namesignupcl" />
                <label>Name</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Name!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input type="text" name="" required className="emailsignupcl" />
                <label>Email</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Email!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input
                  type="number"
                  name=""
                  required
                  className="contactsignupcl"
                />
                <label>Contact No.</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Please Enter A valid Number!</h5>
                </span>
              </div>
              <div className="user-box flex">
                <input
                  type="password"
                  name=""
                  required
                  className="passwordsignupcl"
                />
                <label>Password</label>
                <span className=" text-red-500 absolute mt-11 hidden spannerrsignup">
                  <h5>Must Be More Than 7 Digits</h5>
                </span>
              </div>
              <button style={{ marginTop: "0px" }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetUser;
