// import axiosInstance from "./AxiosConfig";
// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import { useNavigate } from "react-router-dom";

// export default function Page() {
// 	const [vendorDetails, setVendorDetails] = useState([]);
// 	const [offset, setOffset] = useState(1);
// 	const [perPage] = useState(10);
// 	const [pageCount, setPageCount] = useState(0);
// 	// const navigate = useNavigate();

// 	const getVendorDetails = () => {
// 		const payload = {
// 			search: "",
// 			currentPage: offset,
// 			records: perPage,
// 			sortExpression: "",
// 			sortDirection: "",
// 		};

// 		axiosInstance
// 			.post("http://103.138.234.244:9067/api/Vendor/GetVendorList", payload)
// 			.then((res) => {
// 				setVendorDetails(res.data.data.vendorDispalyModel.records);
// 				setPageCount(
// 					Math.ceil(res.data.data.vendorDispalyModel.totalRecords / perPage)
// 				);
// 			})
// 			.catch((error) => console.log("error", error));
// 	};
// 	useEffect(() => {
// 		getVendorDetails();
// 	}, [offset]);

// 	const handlePageClick = (e) => {
// 		const selectedPage = e.selected;
// 		setOffset(selectedPage + 1);
// 	};

// 	return (
// 		<>
// 			<div className="flex flex-col">
// 				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
// 					<div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
// 						<div className="overflow-hidden">
// 							<table className="min-w-full w-12 text-center table-fixed border-collapse block  md:table">
// 								<thead className="border-b bg-gray-800">
// 									<tr>
// 										{/* <th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											#
// 										</th> */}
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											vendor Code
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Name
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Email Address
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Address
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											State Name
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											State Code
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Gst Number
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Pan Number
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											VendorType
// 										</th>
// 										<th
// 											scope="col"
// 											className="text-sm font-medium text-white px-6 py-4"
// 										>
// 											Actions
// 										</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									{vendorDetails.map((items, key) => (
// 										<>
// 											<tr className="bg-white border-b" key={key}>
// 												{/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
// 													{increment}
// 												</td> */}
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorCode}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorName}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorEmail}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorAddress}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorStateName}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorStateCode}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorGSTINNo}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													{items.vendorPANNo}
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													1
// 												</td>
// 												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
// 													<button
// 														className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200"
// 														// onClick={() => {
// 														// 	// navigate(`/UpdateVendor/${items.vendorID}`, {
// 														// 		state: items.vendorID,
// 														// 	});
// 														// }}
// 													>
// 														<svg
// 															xmlns="http://www.w3.org/2000/svg"
// 															height="24"
// 															viewBox="0 0 24 24"
// 															width="24"
// 														>
// 															<path d="M0 0h24v24H0z" fill="none" />
// 															<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// 														</svg>
// 													</button>

// 													<button className="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200">
// 														<svg
// 															xmlns="http://www.w3.org/2000/svg"
// 															height="24"
// 															viewBox="0 0 24 24"
// 															width="24"
// 														>
// 															<path d="M0 0h24v24H0z" fill="none" />
// 															<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
// 														</svg>
// 													</button>
// 												</td>
// 											</tr>
// 										</>
// 									))}
// 								</tbody>
// 							</table>
// 							<ReactPaginate
// 								className="flex items-center justify-between border-t border-gray-200 sm:px-6 m-5 -space-x-px py-3 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
// 								// className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 m-5 -space-x-px"
// 								previousLabel={"<"}
// 								nextLabel={">"}
// 								breakLabel={"..."}
// 								breakClassName={"break-me"}
// 								pageCount={pageCount}
// 								marginPagesDisplayed={2}
// 								pageRangeDisplayed={5}
// 								onPageChange={handlePageClick}
// 								containerClassName={"pagination"}
// 								subContainerClassName={"pages pagination"}
// 								activeClassName={"active"}
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }
