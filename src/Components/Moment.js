import React from "react";
import moment from "moment";
import "moment-timezone";

export default function Moment() {
	const [timeZone, setTimeZone] = React.useState("");
	var march = moment("2022-03-01");
	const [state, setState] = React.useState({
		continent: "",
		country: "",
	});
	var a = moment("2022-03-14"); //now
	var b = moment("2022-01-01");

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSave = (e) => {
		e.preventDefault();
		const temp = march.tz(`${state.continent}/${state.country}`).format("ha z");
		// console.log(temp);
		setTimeZone(temp);
		// console.log(state);
	};

	// console.log("Weeks", a.diff(b, "weeks")); // 4
	// console.log("Hours", a.diff(b, "hours")); // 745
	// console.log("Minits", a.diff(b, "minutes")); // 44700
	// console.log("Days", a.diff(b, "days")); // 31

	return (
		<>
			<div className="w-full max-w-xl mx-auto">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
					onSubmit={handleSave}
				>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2 ">
							Country From
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="continent"
							name="continent"
							type="text"
							required
							// value={vendorDetails.vendorCode}
							placeholder="Country Name"
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2 ">
							Country To
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="country"
							name="country"
							type="text"
							required
							// value={vendorDetails.vendorCode}
							placeholder="Country To"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2 ">
							Difference
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="difference"
							name="difference"
							type="text"
							readOnly
							value={timeZone}
							placeholder="Difference"
							onChange={handleChange}
						/>
					</div>
					<p>Weeks:- {a.diff(b, "weeks")}</p>
					<p>Days:- {a.diff(b, "days")}</p>
					<p>Hours:- {a.diff(b, "hours")}</p>
					<p>Minutes:- {a.diff(b, "minutes")}</p>
					<button
						type="submit"
						className="w-full mt-5 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
