import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const VendorInitialValues = {
	vendorID: 0,
	vendorCode: "",
	vendorName: "",
	vendorEmail: "",
	vendorAddress: "",
	vendorStateName: "",
	vendorStateCode: 1,
	vendorGSTINNo: "",
	vendorPANNo: "",
	vendorType: 1,
};

export default function AddVendor() {
	const [vendorDetails, setVendorDetails] = useState(VendorInitialValues);
	const [vendorType, setVendorType] = useState();
	const [vendorStateName, setVendorStateName] = useState([]);
	const navigate = useNavigate();
	const location = useLocation();
	const vendorID = location.state;

	const handleChange = (e) => {
		setVendorDetails({
			...vendorDetails,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		document.title = "Add Vendors";
		if (!localStorage.getItem("LoginToken")) navigate("/");

		const stateNamePayload = {
			searchText: "",
			countryName: "India",
			countryID: 1,
		};
		const vendorTypePayload = {
			serviceType: 91,
		};
		const promise1 = axiosInstance.post(
			"http://103.138.234.244:9067/api/Vendor/GetVendorByServiceTypeDDL",
			stateNamePayload
		);

		const promise2 = axiosInstance.post(
			"http://103.138.234.244:9067/api/Common/StateList",
			vendorTypePayload
		);
		Promise.all([promise1, promise2]).then((res) => {
			setVendorType(res[0].data.data.vendorList);
			setVendorStateName(res[1].data.data.stateDataList);
		});
	}, []);

	console.log("VSN", vendorStateName);

	useEffect(() => {
		if (vendorID > 0) {
			axiosInstance
				.post("http://103.138.234.244:9067/api/Vendor/GetVendorDetails", {
					vendorID,
				})
				.then((res) => {
					const vendorData = res.data.data.vendorDispalyModel[0];
					console.log(vendorData);
					setVendorDetails({
						...vendorData,
					});
				})

				.catch((error) => console.log(error));
		}
	}, [vendorID]);

	const handleVendorSubmit = (e) => {
		e.preventDefault();
		const vendorData = {
			vendorID: vendorDetails.vendorID,
			vendorCode: vendorDetails.vendorCode,
			vendorName: vendorDetails.vendorName,
			vendorEmail: vendorDetails.vendorEmail,
			vendorAddress: vendorDetails.vendorAddress,
			vendorStateName: vendorDetails.vendorStateName,
			vendorStateCode: vendorDetails.vendorStateCode,
			vendorGSTINNo: vendorDetails.vendorGSTINNo,
			vendorPANNo: vendorDetails.vendorPANNo,
			vendorType: vendorDetails.vendorType,
		};
		axiosInstance
			.post(
				"http://103.138.234.244:9067/api/Vendor/SaveVendorDetails",
				vendorData
			)
			.then((res) => {
				navigate("/ListVendor");
			})
			.catch((error) => {
				console.log(error);
			});

		console.log(vendorData);
	};

	return (
		<>
			<div className="w-full max-w-lg mx-auto">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8"
					onSubmit={handleVendorSubmit}
				>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2 ">
							Vendor Code
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendorcode"
							name="vendorCode"
							type="text"
							required
							value={vendorDetails.vendorCode}
							placeholder="Xyz123"
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Full Name
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendorname"
							value={vendorDetails.vendorName}
							name="vendorName"
							required
							type="text"
							placeholder="Elizabeth Smith Brown"
							onChange={handleChange}
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Email Address
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendoremail"
							value={vendorDetails.vendorEmail}
							name="vendorEmail"
							required
							type="email"
							placeholder="Eliza@mail.com"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Address
						</label>
						<textarea
							className="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:outline-none focus:ring-1"
							value={vendorDetails.vendorAddress}
							id="vendoraddress"
							name="vendorAddress"
							placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							State
						</label>
						<select
							required
							name="vendorStateName"
							onChange={handleChange}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{vendorStateName &&
								vendorStateName.length > 0 &&
								vendorStateName.map((vendor) => (
									<option value={vendor.stateID}>{vendor.stateName}</option>
								))}
						</select>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							State Code
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendorstatecode"
							name="vendorStateCode"
							value={vendorDetails.vendorStateCode}
							required
							type="text"
							placeholder="123456"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Vendor Gst Number
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendorgstno"
							value={vendorDetails.vendorGSTINNo}
							required
							name="vendorGSTINNo"
							type="text"
							placeholder="22AAAAA0000A1Z5"
							// pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Pan Number
						</label>
						<input
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="vendorpanno"
							required
							name="vendorPANNo"
							value={vendorDetails.vendorPANNo}
							type="text"
							placeholder="BNZAA2318J"
							// pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Type
						</label>
						<select
							required
							name="vendorType"
							onChange={(e) => {
								setVendorStateName({
									...vendorDetails,
									[e.target.vendorType]: e.target.value,
								});
							}}
							className="shadow appearance-none border focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						>
							<option>Choose..</option>
							{vendorType &&
								vendorType.length > 0 &&
								vendorType.map((vendor) => (
									<option value={vendor.vendorType}>{vendor.label}</option>
								))}
						</select>
					</div>

					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
							type="submit"
						>
							Submit Record
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
