import { useState, useEffect } from "react";
import { ID } from "appwrite";
import { accountInfo } from "./config/account";
import "./App.css";
import UserForm from "./component/UserForm";
import StoriesDisplay from "./component/StoriesDisplay";

function App() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState("");
	const [user, setUser] = useState(null);

	const [showLogin, setShowLogin] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [showLogout, setShowLogout] = useState(false);
	const [showCreateAStory, setShowCreateAStory] = useState(false);
	const [displayAllStories, setDisplayAllStories] = useState(true);

	useEffect(() => {
		getUser();
	}, []);

	// Function to show login form
	const loginButtonHandle = () => {
		setShowLogin(true);
		setShowSignUp(false);
	};

	const signUpButtonHandle = () => {
		setShowSignUp(true);
		setShowLogin(false);
	};

	const handleCreateAStory = () => {
		showCreateAStory ? setShowCreateAStory(false) : setShowCreateAStory(true);
	};

	//handles login form submission
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		setFormError("");
		//create a session
		const promise = accountInfo.createEmailPasswordSession(email, password);

		promise.then(
			function (response) {
				console.log(response); // Success
				//show logout button
				setShowLogout(true);
				setShowSignUp(false);
				setShowLogin(false);
				//reset form fields
				setEmail("");
				setPassword("");
				//get user details
				getUser();
			},
			function (error) {
				console.log("This error occured", error);
				setFormError(error.message);
			}
		);
	};

	//handle sign up form submission
	const handleSignUpSubmit = (e) => {
		e.preventDefault();
		setFormError("");
		//create a session
		const promise = accountInfo.create(ID.unique(), email, password, name);

		promise.then(
			function (response) {
				console.log(response); // Success
				//show logout button
				setShowLogout(true);
				setShowSignUp(false);
				setShowLogin(false);
				//reset form fields
				setEmail("");
				setPassword("");
			},
			function (error) {
				console.log("This error occured", error);
				setFormError(error.message);
			}
		);
	};

	//get user details
	const getUser = async () => {
		const result = await accountInfo.get();
		setUser(result);
	};

	//handles logout
	const handleLogout = async () => {
		const result = await accountInfo.deleteSession("current");
		//reset user state
		setUser(null);

		console.log(result);
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1> StoryTelling!</h1>
				<nav className="flex justify-around pt-4">
					{!user ? (
						<div className="justify-items-center">
							<button onClick={loginButtonHandle} className="mr-4">
								Login
							</button>
							<button onClick={signUpButtonHandle}>Sign Up</button>
						</div>
					) : (
						<div className="justify-items-center sm:text-sm">
							<button
								className="mr-1 md:mr-4"
								onClick={() => setDisplayAllStories(!displayAllStories)}>
								{!displayAllStories ? "All Stories" : `${user.name} Stories`}
							</button>
							<button className="mr-1 md:mr-4 " onClick={handleCreateAStory}>
								Create A Story
							</button>
							<button onClick={handleLogout}>Logout</button>
						</div>
					)}
				</nav>
				<div className="my-8">
					{showLogin && (
						<UserForm
							handleSubmit={handleLoginSubmit}
							setEmail={setEmail}
							setPassword={setPassword}
							formError={formError}
						/>
					)}
					{showSignUp && (
						<UserForm
							handleSubmit={handleSignUpSubmit}
							setEmail={setEmail}
							setPassword={setPassword}
							formError={formError}
							nameInput={true}
							setName={setName}
						/>
					)}
				</div>
				<div>
					{user && (
						<StoriesDisplay
							user={user}
							showCreateAStory={showCreateAStory}
							setShowCreateAStory={setShowCreateAStory}
							displayAllStories={displayAllStories}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
