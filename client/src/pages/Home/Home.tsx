import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Navbar } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

import * as S from "./Home.styles";

function Home() {
  const [pageCount, setPageCount] = React.useState("2");

  const handleChange = (event: SelectChangeEvent) => {
    setPageCount(event.target.value);
  };

  return (
    <S.Wrapper>
      <S.TextLoginWrapper>
        <S.TextWrapper>
          <S.Title>Biz isi biliyoruz</S.Title>
          <S.SubTitle>
            Ananin Ami Ananin AmiAnanin AmiAnanin AmiAnanin AmiAnanin
          </S.SubTitle>

          <S.Title>Biz isi biliyoruz</S.Title>
          <S.SubTitle>
            Ananin Ami Ananin AmiAnanin AmiAnanin AmiAnanin AmiAnanin
          </S.SubTitle>
        </S.TextWrapper>
        <S.LoginWrapper>
          <S.BoiBussy>Boi Bussies</S.BoiBussy>
          <TextField
            label="Email"
            fullWidth
            error={false}
            placeholder="Your Email..."
          />
          <S.PagesWrapper>
            <FormControl sx={{ marginTop: 2 }}>
              <InputLabel>Page Count</InputLabel>
              <Select
                value={pageCount}
                label="Page Count"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
              </Select>
            </FormControl>

            <S.WordCount>{Number(pageCount) * 250} words</S.WordCount>
          </S.PagesWrapper>
          <Button
            fullWidth
            sx={{ marginTop: 2, height: 50, borderRadius: 10 }}
            variant="contained"
          >
            Submit
          </Button>
        </S.LoginWrapper>
      </S.TextLoginWrapper>
    </S.Wrapper>
  );
}

export default Home;
