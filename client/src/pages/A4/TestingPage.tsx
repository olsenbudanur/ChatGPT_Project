import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Context/AuthContext";
import * as S from "./TestingPage.styles";

function TestingPage(props: any) {
  const [ChatGPTMessage, setChatGPTMessage] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [value3, setValue3] = useState<string>("");
  const [value4, setValue4] = useState<string>("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  //
  // If not logged in..
  React.useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, []);

  async function paperHelper(idx: any, val: any) {
    if (idx == 1) {
      setValue((value) => (value += val));
    } else if (idx == 2) {
      setValue2((value2) => (value2 += val));
    } else if (idx == 3) {
      setValue3((value3) => (value3 += val));
    } else if (idx == 4) {
      setValue4((value4) => (value4 += val));
    }
  }

  async function submit() {
    //
    // Kill all other runs that might be happening.
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }

    setValue("Response is loading.");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Origin", "http://localhost:3000");

    var raw = JSON.stringify({
      prompt: ChatGPTMessage,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      mode: "cors",
    };
    let index = 0;
    fetch("http://localhost:8080/college-essay", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setValue("");
        index = -1;
        let curr = 1;
        let interval = setInterval(() => {
          if (index < data.body.length) {
            paperHelper(curr, data.body.charAt(index));
            if (index != 0 && curr == 1 && index % 1000 == 0) {
              curr++;
            } else if (index != 0 && (index + 200) % 1100 == 0) {
              curr++;
            }
            // if (index != 0 && index % 1200 == 0) {
            // 	curr++;
            // }
            // setValue(
            // 	(value) =>
            // 		(value +=
            // 			data.body.charAt(index))
            // );
            index++;
          } else {
            clearInterval(interval);
          }
        }, 6);
      })
      .catch((error) => {
        console.log("error", error);
        setValue("ERROR: " + error.toString());
      });
  }

  return (
    <S.OuterLayer className="TestingPage">
      <input
        type="textarea"
        name="textValue"
        onChange={(e) => setChatGPTMessage(e.target.value)}
      />
      <button onClick={submit}>Send the data</button>
      <br></br>
      <S.Paper>
        <S.EssayTitle>College Essay</S.EssayTitle>
        <S.EssayText>{value}</S.EssayText>
      </S.Paper>
      <br></br>
      <S.Paper>
        <S.EssayText>{value2}</S.EssayText>
      </S.Paper>
      <br></br>
      <S.Paper>
        <S.EssayText>{value3}</S.EssayText>
      </S.Paper>
      <br></br>
      <S.Paper>
        <S.EssayText>{value4}</S.EssayText>
      </S.Paper>
    </S.OuterLayer>
  );
}

export default TestingPage;
