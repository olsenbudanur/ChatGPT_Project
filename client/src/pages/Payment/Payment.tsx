import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as S from "./Payment.styles";
import { Alert } from "@mui/material";
import {
	createUserWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../components/Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const exampleEssay = require("../../assets/blurEssay.png");

export default function Payment() {
	const navigate = useNavigate();
	const location = useLocation();

	const toEssay = () => {
		navigate("/test", { state: location.state });
	};

	return (
		<>
			<S.Sec2Wrapper>
				Your essay is ready!
				<br></br>
				<br></br>
				<S.Image src={String(exampleEssay)} />
				Limited Time sale!!!
				<Button
					onClick={() => {
						toEssay();
					}}
					sx={{
						my: 2,
						background: "#1b58bd",
						color: "white",
						display: "block",
					}}
					color="inherit"
				>
					Get or Buy (Depends idk)!
				</Button>
			</S.Sec2Wrapper>
		</>
	);
}
