import React, { useContext, useEffect, useState } from "react";

import {
	createUserWithEmailAndPassword,
	sendSignInLinkToEmail,
	signOut,
	isSignInWithEmailLink,
	getAuth,
	signInWithEmailLink,
} from "firebase/auth";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

//
// Reference this video: https://www.youtube.com/watch?v=PKwu15ldZ7k&t=1s
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	//
	// New user signs on thru this method.
	function signUp(email) {
		//
		// Generate a bogus password on the fly since password is irrelevent
		const chars =
			"0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const passwordLength = 15;
		let password = "";
		for (var i = 0; i <= passwordLength; i++) {
			var randomNumber = Math.floor(Math.random() * chars.length);
			password += chars.substring(randomNumber, randomNumber + 1);
		}

		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		navigate("/");
		return auth.signOut();
	}

	//
	// Work-in-progress. Not complete yet.
	function linkSignIn(email) {
		// const actionCodeSettings = {
		// 	// URL you want to redirect back to. The domain (www.example.com) for this
		// 	// URL must be in the authorized domains list in the Firebase Console.
		// 	url: "http://localhost:3000/prompt",
		// 	// This must be true.
		// 	handleCodeInApp: true,
		// 	iOS: {
		// 		bundleId: "com.example.ios",
		// 	},
		// 	android: {
		// 		packageName: "com.example.android",
		// 		installApp: true,
		// 		minimumVersion: "12",
		// 	},
		// 	dynamicLinkDomain: "mementomemories.com",
		// };
		const actionCodeSettings = {
			url: "http://localhost:3000/login", // Replace with the URL of your login page
			handleCodeInApp: true,
		};
		sendSignInLinkToEmail(auth, email, actionCodeSettings)
			.then((e) => {
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.
				window.localStorage.setItem("emailForSignIn", email);
				// ...
				console.log(e);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ...
			});
	}

	function linkSignInComplete() {
		if (isSignInWithEmailLink(auth, window.location.href)) {
			signInWithEmailLink(
				auth,
				"olsenbudanur@gmail.com",
				window.location.href
			).then((result) => {
				navigate("/");
			});
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		linkSignIn,
		logOut,
		linkSignInComplete,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
