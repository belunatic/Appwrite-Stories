import { useState } from "react";
import PropTypes from "prop-types";
import { databaseInfo } from "../config/account";
import { ID } from "appwrite";

const StoryForm = (props) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const promise = databaseInfo.createDocument(
			import.meta.env.VITE_DATABASE_ID,
			import.meta.env.VITE_COLLECTION_ID,
			ID.unique(),
			{
				title: title,
				body: body.replace(/[&<>"']/g, ""),
				userId: props.userInfo.$id,
			}
		);

		promise.then(
			function (response) {
				console.log(response);
				props.setStories([...props.stories, response]);
				props.setShowCreateAStory(false);
			},
			function (error) {
				setFormError(error.message);
				console.log(error);
			}
		);
	};

	return (
		<>
			<p className="text-xl text-left items-start">Create A Story</p>
			<p className="text-center text-red-500">{formError}</p>
			<form className="flex flex-col text-left my-8" onSubmit={handleSubmit}>
				<label
					htmlFor="name"
					className="mt-4 block text-sm font-medium mb-2 dark:text-white">
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					className="py-3 px-4 block w-fit border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
					placeholder="John Doe"
					onChange={(e) => setTitle(e.target.value)}
					required
				/>

				<div className="max-w-sm space-y-3 py-4">
					<label
						htmlFor="body"
						className="block text-sm font-medium mb-2 dark:text-white">
						Juicy Story
					</label>
					<textarea
						className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
						rows="3"
						placeholder="This is a textarea placeholder"
						id="body"
						name="body"
						onChange={(e) => setBody(e.target.value)}></textarea>
				</div>
				<div className>
					<button className="mt-6 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-fit">
						Submit
					</button>
					<button
						type="button"
						onClick={() => props.setShowCreateAStory(false)}
						className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-fit">
						Cancel
					</button>
				</div>
			</form>
		</>
	);
};

//Props validation
StoryForm.propTypes = {
	userInfo: PropTypes.object,
	setStories: PropTypes.func,
	stories: PropTypes.array,
	setShowCreateAStory: PropTypes.func,
};
export default StoryForm;
