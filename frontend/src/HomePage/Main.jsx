import React, { useEffect, useState } from "react";
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Main = () => {
  let [arr, setArr] = useState([""]);
  useEffect(() => {
    let item = localStorage.getItem("arr");
    if (item) {
      let parse_arr = JSON.parse(item);
      setArr(parse_arr);
    }
  }, []);

  const [text, setText] = useState("");

  const navigate = useNavigate();

  console.log("Arr: ", arr, "text:", text);

  const adder = () => {
    if (text === "") {
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
    const city = text.toLowerCase();

    if (arr.find((ele) => ele === city)) {
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
      prev[prev.length - 1] = city;
      let new_arr = [...prev];
      new_arr.push("");
      localStorage.setItem("arr", JSON.stringify(new_arr));
      setText("");
      return new_arr;
    });
  };

  const remover = (ind) => {
    if (ind === arr.length - 1 && text === "") {
      return;
    }
    if (arr.length > 1) {
      setArr((prev) => {
        const new_arr = arr.filter((ele, index) => index !== ind);
        localStorage.setItem("arr", JSON.stringify(new_arr));
        return new_arr;
      });
    }
  };

  const handleSubmit = () => {
    if (arr.length === 1) {
      return toast.error("Please Enter Atleast One City!", {
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
    navigate("/page");
    window.location.reload();
  };

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
                key={ind}
              >
                <div id="s-no" style={{ height: "100%", width: "5%" }}>
                  {ind + 1}
                </div>
                <input
                  type="text"
                  value={ind === arr.length - 1 ? text : ele}
                  onChange={(e) => setText(e.target.value)}
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
          <div className="buttons">
            <button className="submit" id="bg1" onClick={() => handleSubmit()}>
              Submit
            </button>
            <button className="submit" id="bg2" onClick={() => adder()}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  color: "green",
                  fontSize: "1.5vw",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

/*if (arr[ind] === "") {
  arr[ind] = text;
  arr[ind] = arr[ind].toLowerCase();
}

if (arr[ind] === "") {
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

if (arr.find((ele, index) => index !== ind && ele === arr[ind])) {
  arr[ind] = "";
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
};*/
