import PropTypes from "prop-types";

const UserForm = (props) => {
	return (
		<>
			<p className="text-center text-red-500">{props.formError}</p>
			<form className="flex flex-col text-left" onSubmit={props.handleSubmit}>
				{props.nameInput && (
					<>
						<label
							htmlFor="name"
							className="mt-4 block text-sm font-medium mb-2 dark:text-white">
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
							placeholder="John Doe"
							onChange={(e) => props.setName(e.target.value)}
						/>
					</>
				)}
				<label
					htmlFor="email"
					className="mt-4 block text-sm font-medium mb-2 dark:text-white">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
					placeholder="you@site.com"
					onChange={(e) => props.setEmail(e.target.value)}
				/>

				<label
					htmlFor="password"
					className="mt-4 block text-sm font-medium mb-2 dark:text-white">
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
					onChange={(e) => props.setPassword(e.target.value)}
				/>
				<button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					{" "}
					Login{" "}
				</button>
			</form>
		</>
	);
};

//Props validation
UserForm.propTypes = {
	setEmail: PropTypes.func,
	setPassword: PropTypes.func,
	handleSubmit: PropTypes.func,
	formError: PropTypes.string,
	nameInput: PropTypes.bool,
	setName: PropTypes.func,
};

export default UserForm;
