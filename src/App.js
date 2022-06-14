import "./App.css";
import Mario from "./Mario.js";
import Diamond from "./Diamond.js";
import { useState } from "react";
import Appearwin from "./Appearwin";
import Appearlose from "./Appearlose";
import Ngaivat from "./Ngaivat";
import { useEffect } from "react";

export default function App() {
  let name_Array = [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  ];

  let show = false;
  const [m, setM] = useState(14);
  const [n, setN] = useState(14);
  const [time, setTime] = useState(30);
  
  useEffect(() => {
    const timeId = setTimeout(() => {
      if (time !== 0 && (m!==0 || n!==0)) {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearTimeout(timeId);
    // eslint-disable-next-line
  }, [time]);

  function handleCheck(index, sub_index) {
    return name_Array[index][sub_index] === 1;
  }

  function appear(index, sub_index) {
    if (index === m && sub_index === n) {
      show = true;
    } else {
      show = false;
    }
    // console.log(show + " " + m + " " + index + " " + sub_index);
    return show;
  }

  function appears(index, sub_index) {
    if(index === 0 && sub_index === 0){
      return true
    }
    return false;
  }

  function checkNgaiVat(index, sub_index) {
    if (name_Array[index][sub_index] === 1) {
      return true;
    }
    return false;
  }

  const handleLen = () => {
    const i = Math.min(14, Math.max(m - 1, 0));
    if (name_Array[i][n] !== 1 && m !== 0) {
      setM(m - 1);
      appear(m, n);
    }
  };

  const handleXuong = () => {
    const i = Math.max(0, Math.min(m + 1, 14));
    if (name_Array[i][n] !== 1 && m !== 14) {
      setM(m + 1);
      appear(m, n);
    }
  };

  const handleTrai = () => {
    if (name_Array[m][n - 1] !== 1 && n !== 0) {
      setN(n - 1);
      appear(m, n);
    }
  };

  const handlePhai = (e) => {
    if (name_Array[m][n + 1] !== 1 && n !== 14) {
      if (m === 0 && n === 0) {
        show = false;
      }
      setN(n + 1);
      appear(m, n);
    }
  };

  function showWin(m, n) {
    if (m === 0 && n === 0) {
      return true;
    }
    return false;
  }

  function showLose(m, n) {
    if (time === 0 && m !== 0 && n !== 0) {
      return true;
    }
    return false;
  }

  return (
    <div className="App">
      <div className="Contenner">
        <div className="contenner_left">
          {[...Array(15)].map((item, index) => (
            <div key={index} style={{ display: "flex" }}>
              {[...Array(15)].map((sub_item, sub_index) => (
                <div
                  key={sub_index}
                  className="box"
                  style={{
                    backgroundColor: handleCheck(index, sub_index)
                      ? "black"
                      : "white",
                  }}
                >
                  {appear(index, sub_index) && <Mario />}
                  {appears(index, sub_index) && <Diamond />}
                  {checkNgaiVat(index, sub_index) && <Ngaivat />}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="contenner_right">
          <div className="Time">
            <p>Thời gian còn lại của bạn là</p>
            <h1>00:00:{time}</h1>
          </div>
          <div className="contenner_button" >
            <button className="button1" onClick={handleLen}>
              <img src="images/anh_len.jpg" alt="len" className="image" data-toggle="modal" data-target="#myModal"/>
            </button>
            <br />
            <button className="button" onClick={handleTrai}>
              <img src="images/anh_trai.jpg" alt="trai" className="image" data-toggle="modal" data-target="#myModal"/>
            </button>

            <button className="button" onClick={handleXuong} >
              <img src="images/anh_xuong.jpg" alt="xuong" className="image" data-toggle="modal" data-target="#myModal"/>
            </button>

            <button className="button" onClick={handlePhai} >
              <img src="images/anh_phai.jpg" alt="phai" className="image" data-toggle="modal" data-target="#myModal"/>
            </button>
          </div>
        </div>  
      </div>
      <div className="finish_win">{showWin(m,n) && <Appearwin />}</div>
      <div className="finish_lose">{showLose(m,n) && <Appearlose />}</div>
    </div>
  );
}
