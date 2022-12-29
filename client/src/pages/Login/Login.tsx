import React, { useEffect } from "react";
import { useAuth } from "../../components/Context/AuthContext";

function Login() {
	const { linkSignIn, currentUser, linkSignInComplete }: any = useAuth();

	useEffect(() => {
		linkSignInComplete();
	}, []);

	return <div>This will be login page</div>;
}

export default Login;
