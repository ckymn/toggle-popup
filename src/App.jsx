import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const closePopup = (e) => {
      if (e.path[0].tagName !== "INPUT") {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("click", closePopup);

    return () => {
      document.body.removeEventListener("click", closePopup);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await axios
        .get("https://form.jotform.com/222233527999062", {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*", // Could work and fix the previous problem, but not in all APIs
          },
        })
        .then((response) => {
          response;
        });

      setData(data);
    };

    console.log(getData());
  }, data);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <input type="button" value="PP" onClick={togglePopup} />
      {isOpen && (
        <Popup
          content={
            <>
              <b>Design your Popup</b>
              <p>Hello, Guys</p>
              <button>Test button</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

const Popup = ({ handleClose, content }) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>
          x
        </span>
        {content}
      </div>
    </div>
  );
};

export default App;
