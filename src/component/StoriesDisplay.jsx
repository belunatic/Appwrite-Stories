import PropTypes from "prop-types";
import AllStories from "./AllStories";
import UserStories from "./UserStories";

const StoriesDisplay = (props) => {
	return (
		<div className="flex flex-col justify-center">
			<h2 className="text-2xl text-center mb-8">
				{props.displayAllStories ? "All" : props.user.name} Stories
			</h2>

			{props.displayAllStories ? (
				<AllStories
					showCreateAStory={props.showCreateAStory}
					setShowCreateAStory={props.setShowCreateAStory}
					userInfo={props.user}
				/>
			) : (
				<UserStories
					showCreateAStory={props.showCreateAStory}
					setShowCreateAStory={props.setShowCreateAStory}
					userInfo={props.user}
				/>
			)}
		</div>
	);
};

//Props validation
StoriesDisplay.propTypes = {
	user: PropTypes.object,
	showCreateAStory: PropTypes.bool,
	setShowCreateAStory: PropTypes.func,
	displayAllStories: PropTypes.bool,
};
export default StoriesDisplay;
