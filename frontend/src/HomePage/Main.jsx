import React, { useEffect, useState } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [text, setText] = useState("");
  let [arr, setArr] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    let item = localStorage.getItem("arr");
    if (item) {
      let parse_arr = JSON.parse(item);
      setArr(parse_arr);
    }
  }, []);

  const adder = (ind) => {

     if(arr[ind] === ""){
      arr[ind] = text;
      arr[ind] = arr[ind].toLowerCase();
     }

     if(arr[ind] === ""){
       return toast.error("Please Enter Valid City Name!", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     }

     if(arr.find((ele,index)=>index !== ind && ele === arr[ind])){
      arr[ind] =  "";
      return toast.error("City Already Enterd!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
     }

    setArr((prev) => {
      let new_arr = [...prev];
      new_arr.push("");
      localStorage.setItem("arr", JSON.stringify(new_arr));
      return new_arr;
    });
    setText("");
  };

  const remover = (ind) => {
    arr.length > 1 &&
      setArr((prev) => {
        const new_arr = arr.filter((ele, index) => index !== ind);
        localStorage.setItem("arr", JSON.stringify(new_arr));
        return new_arr;
      });
  };

  const handleSubmit = () => {
      navigate("/page");
      window.location.reload();
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div id="main-cont">
        <div id="inp-cont">
          <div className="heading">Go On....Add Upto 30 Cities!</div>
          <div className="heading">Their Weather is Just a Click Away</div>
          <div id="opt-cont">
            {arr.map((ele, ind) => (
              <div
                className="inputers"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(126, 196, 223, 0.612),slategray)",
                }}
              >
                <div id="s-no" style={{ height: "100%", width: "5%" }}>
                  {ind + 1}
                </div>
                <input
                  type="text"
                  name="city"
                  value={arr[ind] === "" ? text : arr[ind]}
                  onChange={(e) => {
                    arr[ind] === "" &&
                    setText(e.target.value)
                  }}
                  style={{
                    border: "none",
                    width: "80%",
                    height: "100%",
                    fontFamily: "'Poppins','sans-serif'",
                    background:
                      "linear-gradient(180deg,rgba(126, 196, 223, 0.612),slategray)",
                    fontSize: "1vw",
                    outline: "none",
                  }}
                ></input>
                <button
                  style={{
                    border: "none",
                    background:
                      "linear-gradient(180deg,rgba(126, 196, 223, 0.612),slategray)",
                  }}
                  onClick={()=>adder(ind)}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      color: "green",
                      fontSize: "1.5vw",
                      cursor: "pointer",
                    }}
                  />
                </button>
                <button
                  style={{
                    border: "none",
                    background:
                      "linear-gradient(180deg,rgba(126, 196, 223, 0.612),slategray)",
                  }}
                  onClick={() => remover(ind)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{
                      color: "red",
                      fontSize: "1.5vw",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
          <button id="submit" onClick={()=>handleSubmit()}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
