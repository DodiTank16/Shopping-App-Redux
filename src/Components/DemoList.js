import React, { useState } from "react";
// import axiosInstance from "./AxiosConfig";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
// import Box from "@material-ui/core/Box";

export default function DemoList() {
	// const [countryName, setCountryName] = useState([]);
	// const [stateName, setStateName] = useState([]);
	// const [cityName, setCityName] = useState([]);
	// const [areaName, setareaName] = useState([]);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [remainingTime, setRemainingTime] = useState();
	const [newdata, Setnewdata] = useState();
	const [error, setError] = useState(false);

	// const [remainingTime, setRemainingTime] = useState();

	// const [state, setState] = useState({
	// 	countryID: "",
	// 	stateID: "",
	// 	cityID: "",
	// 	areaID: "",
	// });

	// // Payloads of Country, State cnd City
	// const payloadState = {
	// 	searchText: "",
	// 	countryName: "",
	// 	countryID: state.countryID,
	// };
	// const payloadCity = {
	// 	searchText: "",
	// 	countryID: state.countryID,
	// 	stateID: state.stateID,
	// };
	// const payloadArea = {
	// 	id: state.cityID,
	// 	searchText: "",
	// };

	// // *Country Api is called down here..
	// useEffect(() => {
	// 	axiosInstance
	// 		.post("/Common/CountryList")
	// 		.then((countryRes) => {
	// 			setCountryName(countryRes.data.data.countryList);
	// 		})
	// 		.catch((error) => console.log("Country Error"));
	// }, []);

	// // *State Api is called down here..
	// useEffect(() => {
	// 	state.countryID &&
	// 		axiosInstance
	// 			.post("/Common/StateList", payloadState)
	// 			.then((stateRes) => {
	// 				setStateName(stateRes.data.data.stateDataList);
	// 			})
	// 			.catch((error) => console.log("State Error"));
	// }, [state.countryID]);

	// // *City Api is called down here..
	// useEffect(() => {
	// 	state.stateID &&
	// 		axiosInstance
	// 			.post("/Common/CityList", payloadCity)
	// 			.then((cityRes) => {
	// 				setCityName(cityRes.data.data.cityList);
	// 			})
	// 			.catch((error) => console.log("City Error"));
	// }, [state.stateID]);

	// // *Area Api is called down here..
	// useEffect(() => {
	// 	state.cityID &&
	// 		axiosInstance
	// 			.post("/Common/AreaList", payloadArea)
	// 			.then((areaRes) => {
	// 				setareaName(areaRes.data.data.areaList);
	// 			})
	// 			.catch((error) => console.log("City Error"));
	// }, [state.cityID]);

	// const handleChange = (e) => {
	// 	setState({
	// 		...state,
	// 		[e.target.name]: e.target.value,
	// 	});
	// };

	// const handleChangeCountry = (e) => {
	// 	setState({
	// 		countryID: e.target.value,
	// 		stateID: "",
	// 		cityID: "",
	// 		areaID: "",
	// 	});
	// };

	// const handleChangeState = (e) => {
	// 	setState({
	// 		stateID: e.target.value,
	// 		cityID: "",
	// 		areaID: "",
	// 	});
	// };

	// const handleChangeCity = (e) => {
	// 	setState({
	// 		cityID: e.target.value,
	// 		areaID: "",
	// 	});
	// };

	const handleChangeSDate = (newSValue) => {
		setStartDate(newSValue);
		// console.log("Start Date", startDate);
	};

	const handleChangeEDate = (newEValue) => {
		// console.log("End Date", endDate);
		setEndDate(newEValue);
	};
	const submitDate = (e) => {
		e.preventDefault();
		var sDate = startDate.getTime();
		var eDate = endDate.getTime();
		var newDate = (eDate - sDate) / (1000 * 3600 * 24);
		Setnewdata(newDate);
		if (!newdata.toString().charAt(0) === "-") {
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<>
			<div className="w-full max-w-lg mx-auto">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
					onSubmit={submitDate}
				>
					{/* <div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Country
						</label>
						<select
							required
							name="countryID"
							value={state.countryID}
							onChange={handleChangeCountry}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{countryName &&
								countryName.length > 0 &&
								countryName.map((country) => (
									<option key={country.countryID} value={country.countryID}>
										{country.countryName}
									</option>
								))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							State
						</label>
						<select
							required
							name="stateID"
							value={state.stateID}
							onChange={handleChangeState}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{stateName &&
								stateName.length > 0 &&
								stateName.map((state) => (
									<option key={state.stateID} value={state.stateID}>
										{state.stateName}
									</option>
								))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							City
						</label>
						<select
							required
							name="cityID"
							value={state.cityID}
							onChange={handleChangeCity}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{cityName &&
								cityName.length > 0 &&
								cityName.map((city) => (
									<option key={city.cityID} value={city.cityID}>
										{city.cityName}
									</option>
								))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Area
						</label>
						<select
							required
							name="areaID"
							value={state.areaID}
							onChange={handleChange}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{areaName &&
								areaName.length > 0 &&
								areaName.map((area) => (
									<option key={area.value} value={area.value}>
										{area.label}
									</option>
								))}
						</select>
					</div> */}
					<div style={{ marginTop: "5%", marginBottom: "2%" }}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<MobileDatePicker
								className="m-2"
								label="Start Date"
								inputFormat="dd/MM/yyyy"
								name="startDate"
								value={startDate}
								onChange={handleChangeSDate}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<MobileDatePicker
								label="End Date"
								inputFormat="dd/MM/yyyy"
								name="endDate"
								value={endDate}
								// minDate={new Date(startDate)}
								onChange={handleChangeEDate}
								renderInput={(params) => <TextField {...params} />}
							/>
							{error && (
								<p style={{ color: "red" }}>
									{" "}
									End date cannot be before start date{" "}
								</p>
							)}
						</LocalizationProvider>
					</div>
					<TextField aria-readonly value={Math.round(newdata)} />
					{/* <p>{newdata} </p> */}

					<button
						type="submit"
						// onClick={submitDate}
						className="w-full mt-5 h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}
