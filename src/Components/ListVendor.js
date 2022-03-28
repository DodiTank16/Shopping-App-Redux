import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./AxiosConfig";
import ReactPaginate from "react-paginate";

export default function ListVendor() {
	const location = useLocation();
	const navigate = useNavigate();
	const [offset, setOffset] = useState(1);
	const [perPage] = useState(10);
	const [pageCount, setPageCount] = useState(0);
	const [vendorDetails, setVendorDetails] = useState([]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	const token = localStorage.getItem("LoginToken");
	useEffect(() => {
		if (!localStorage.getItem("LoginToken")) navigate("/");
	}, []);

	const handleLogout = () => {
		const logOut = {
			empNo: location.state,
			token: token,
		};
		// console.log(location.state, token);

		axiosInstance
			.post("http://103.138.234.244:9067/api/Login/LogOutLog", logOut)
			.then((res) => {
				console.log("Status Code is : ", res.data.StatusCode);
				localStorage.removeItem("LoginToken");
			})
			.catch((error) => console.log("Error", error));

		navigate("/");
	};

	const getVendorDetails = () => {
		const payload = {
			search: inputText,
			currentPage: offset,
			records: perPage,
			sortExpression: "",
			sortDirection: "",
		};

		axiosInstance
			.post("http://103.138.234.244:9067/api/Vendor/GetVendorList", payload)
			.then((res) => {
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
				setVendorDetails(res.data.data.vendorDispalyModel.records);
				setPageCount(
					Math.ceil(res.data.data.vendorDispalyModel.totalRecords / perPage)
				);
			})
			.catch((error) => console.log("error", error));
	};
	useEffect(() => {
		getVendorDetails();
		document.title = "List Vendors";
	}, [offset, inputText]);

	const addVendorBtn = () => {
		navigate("/AddVendor");
	};

	const toHome = () => {
		navigate("/HomePage");
	};
	const handlePageClick = (e) => {
		const selectedPage = e.selected;
		setOffset(selectedPage + 1);
	};
	let inputHandler = (e) => {
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	const filteredData = vendorDetails.filter((dataFiltered) => {
		//if no input the return the original
		if (inputText === "") {
			return dataFiltered;
		}
		//return the item which contains the user input
		else {
			return (
				dataFiltered.vendorName &&
				dataFiltered.vendorName.toLowerCase().includes(inputText.toLowerCase())
			);
		}
	});

	return (
		<>
			<div className="items-center m-0 pt-4">
				<button
					className="bg-gradient-to-r mr-5 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
					type="button"
					onClick={handleLogout}
				>
					Sign Out
				</button>
				<button
					className="bg-gradient-to-r mr-5 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
					type="button"
					onClick={addVendorBtn}
				>
					Add Vendor
				</button>
				<button
					className="bg-gradient-to-r mr-5 from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
					type="button"
					onClick={toHome}
				>
					HomePage
				</button>
				<input
					type="text"
					className="px-4 py-2 w-80 items-center justify-center rounded-md"
					placeholder="Search..."
					onChange={inputHandler}
				/>
			</div>
			{isLoading && (
				<div class="flex justify-center items-center space-x-2 mt-20">
					<svg
						role="status"
						class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-500 fill-green-500"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
				</div>
			)}

			{!isLoading && (
				<div className="flex flex-col">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden">
								<table className="min-w-full w-12 text-center table-fixed border-collapse block  md:table">
									<thead className="border-b bg-gray-800">
										<tr>
											{/* <th
											scope="col"
											className="text-sm font-medium text-white px-6 py-4"
										>
											#
										</th> */}
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												vendor Code
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Name
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Email Address
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Address
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												State Name
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												State Code
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Gst Number
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Pan Number
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												VendorType
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-white px-6 py-4"
											>
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{filteredData.map((items) => (
											<>
												<tr className="bg-white border-b" key={items.vendorID}>
													{/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{increment}
												</td> */}
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorCode}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorName}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorEmail}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorAddress}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorStateName}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorStateCode}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorGSTINNo}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														{items.vendorPANNo}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														1
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
														<button
															className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
															onClick={() => {
																navigate(`/UpdateVendor/${items.vendorID}`, {
																	state: items.vendorID,
																});
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																height="24"
																viewBox="0 0 24 24"
																width="24"
															>
																<path d="M0 0h24v24H0z" fill="none" />
																<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
															</svg>
														</button>

														<button className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																height="24"
																viewBox="0 0 24 24"
																width="24"
															>
																<path d="M0 0h24v24H0z" fill="none" />
																<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
															</svg>
														</button>
													</td>
												</tr>
											</>
										))}
									</tbody>
								</table>
								<ReactPaginate
									className="flex items-center justify-between border-t border-gray-200 sm:px-6 m-5 -space-x-px py-3 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
									// className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 m-5 -space-x-px"
									previousLabel={"<"}
									nextLabel={">"}
									breakLabel={"..."}
									breakClassName={"break-me"}
									pageCount={pageCount}
									marginPagesDisplayed={2}
									pageRangeDisplayed={5}
									onPageChange={handlePageClick}
									containerClassName={"pagination"}
									subContainerClassName={"pages pagination"}
									activeClassName={"active"}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
