import { useEffect, useState } from "react";
import { Query } from "appwrite";
import { databaseInfo } from "../config/account";
import StoryForm from "./StoryForm";
import PropTypes from "prop-types";
import EditStory from "./EditStoryForm";

const AllStories = (props) => {
	const [stories, setStories] = useState([]);
	const [showEditForm, setShowEditForm] = useState(false);
	const [storyId, setStoryId] = useState("");

	useEffect(() => {
		getStories();
	}, []);

	const getStories = () => {
		let promise = databaseInfo.listDocuments(
			import.meta.env.VITE_DATABASE_ID,
			import.meta.env.VITE_COLLECTION_ID,
			[Query.orderDesc()]
		);
		promise.then(
			function (response) {
				// console.log(response);
				setStories(response.documents);
			},
			function (error) {
				console.log(error);
			}
		);
	};

	const displayEditForm = (id) => {
		setStoryId(id);
		setShowEditForm(true);
	};

	const handleDelete = async (id) => {
		const promise = await databaseInfo.deleteDocument(
			import.meta.env.VITE_DATABASE_ID,
			import.meta.env.VITE_COLLECTION_ID,
			id
		);

		setStories(stories.filter((story) => story.$id !== id));

		console.log(promise);
	};

	return (
		<div>
			{props.showCreateAStory && (
				<StoryForm
					userInfo={props.userInfo}
					setShowCreateAStory={props.setShowCreateAStory}
					setStories={setStories}
					stories={stories}
				/>
			)}
			<div>
				{stories.map((story) => {
					return (
						<div
							className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 text-left mt-4"
							key={story.$id}>
							<div className="p-4 md:p-10">
								<h3 className="text-lg font-bold text-gray-800 dark:text-white">
									{story.title}
								</h3>
								<p className="mt-2 text-gray-500 dark:text-neutral-400">
									{story.body}
								</p>
								{props.userInfo && story.userId === props.userInfo.$id ? (
									<div>
										{!showEditForm && (
											<div>
												<button
													className="mt-4 bg-blue-200 inStoryButton text-white px-4 py-2 rounded-lg mr-4"
													onClick={() => handleDelete(story.$id)}>
													Delete
												</button>

												<button
													className="mt-4 bg-blue-200 inStoryButton text-white px-4 py-2 rounded-lg"
													onClick={() => displayEditForm(story.$id)}>
													Edit
												</button>
											</div>
										)}
									</div>
								) : (
									""
								)}
							</div>
							{showEditForm && story.$id === storyId ? (
								<EditStory
									title={story.title}
									body={story.body}
									userInfo={props.userInfo}
									storyId={story.$id}
									setShowEditForm={setShowEditForm}
									getStories={getStories}
								/>
							) : (
								""
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

AllStories.propTypes = {
	userInfo: PropTypes.object,
	showCreateAStory: PropTypes.bool,
	setShowCreateAStory: PropTypes.func,
};

export default AllStories;
