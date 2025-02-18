import { useState } from "react";
import PropTypes from "prop-types";
import { databaseInfo } from "../config/account";
import { ID } from "appwrite";

const EditStoryForm = (props) => {
	const [title, setTitle] = useState(props.title);
	const [body, setBody] = useState(props.body);
	const [formError, setFormError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const promise = databaseInfo.updateDocument(
			import.meta.env.VITE_DATABASE_ID,
			import.meta.env.VITE_COLLECTION_ID,
			props.storyId,
			{
				title: title,
				body: body.replace(/[&<>"']/g, ""),
			}
		);

		promise.then(
			function (response) {
				console.log(response);
				props.getStories();
				props.setShowEditForm(false);
			},
			function (error) {
				setFormError(error.message);
				console.log(error);
			}
		);
	};

	return (
		<div className="p-4 md:px-10 md:py-4">
			<p className="text-xl">Edit Story</p>
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
					value={title}
					className="py-3 px-4 block w-fit  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-200 dark:border-neutral-700 dark:text-neutral-900 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
						className="py-3 px-4 block w-full  border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-200 dark:border-neutral-700 dark:text-neutral-900 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
						rows="3"
						placeholder="This is a textarea placeholder"
						id="body"
						name="body"
						value={body}
						onChange={(e) => setBody(e.target.value)}></textarea>
				</div>
				<div className>
					<button className="mt-6 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-fit inStoryButton">
						Submit
					</button>
					<button
						type="button"
						onClick={() => props.setShowEditForm(false)}
						className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  w-fit inStoryButton">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

//Props validation
EditStoryForm.propTypes = {
	userInfo: PropTypes.object,
	setStories: PropTypes.func,
	stories: PropTypes.array,
	setShowEditForm: PropTypes.func,
	title: PropTypes.string,
	body: PropTypes.string,
	storyId: PropTypes.instanceOf(ID),
	getStories: PropTypes.func,
};
export default EditStoryForm;
