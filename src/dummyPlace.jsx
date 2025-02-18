import { useState, useEffect } from "react";
import { Client, Account, ID } from "appwrite";
import { accountInfo } from "./config/account";
import "./App.css";

function App() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const [user, setUser] = useState(null);
	const [session, setSession] = useState(null);

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		setLoginError("");
		const client = new Client().setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

		const account = new Account(client);

		const promise = account.create(ID.unique(), email, password);

		promise.then(
			function (response) {
				console.log(response); // Success
			},
			function (error) {
				console.log("This error occured", error.message);
				setLoginError(error.message);
			}
		);
	};

	const handleSignInSubmit = (e) => {
		e.preventDefault();
		setLoginError("");

		const promise = accountInfo.createEmailPasswordSession(email, password);

		promise.then(
			function (response) {
				console.log(response); // Success
			},
			function (error) {
				console.log("This error occured", error);
				setLoginError(error.message);
			}
		);
	};

	const getUser = async () => {
		const client = new Client()
			.setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
			.setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

		const account = new Account(client);
		//get account details
		const result = await account.get();
		setUser(result);
		//get session details
		const session = await account.getSession(
			"current" // sessionId
		);
		setSession(session.$id);

		console.log(result, "\n This is the session: \n", session);
	};

	useEffect(() => {
		console.log("This, is the user data", getUser());
	}, []);

	const endSession = async () => {
		const client = new Client()
			.setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
			.setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

		const account = new Account(client);

		const result = await account.deleteSession(session);

		console.log(result);
	};

	return (
		<>
			<p>{email}</p>
			<p>{loginError}</p>
			<h2>Login</h2>
			<form onSubmit={handleLoginSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			<h2>Sign In</h2>
			<form onSubmit={handleSignInSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			<h2>User</h2>
			<p>{user ? user.email : "No user Login in"}</p>
			<p>
				<button onClick={endSession}>LogOut</button>
			</p>
		</>
	);
}

//export default App;
