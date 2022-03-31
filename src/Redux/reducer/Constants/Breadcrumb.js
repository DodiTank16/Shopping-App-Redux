import React from "react";
import { useLocation, Link } from 'react-router-dom'

const Breadcrumb = () => {
	const location = useLocation()
	// const path = location.pathname.split(/[/]/);
	// console.log("location", path)

	const breadCrumbView = () => {
		const { pathname } = location;
		const pathnames = pathname.split("/").filter((item) => item);
		const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
		return (
			<div>
				<nav
					className="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
					aria-label="Breadcrumb"
				>
					{/* {pathnames.length > 0 ? (
							<ol className="inline-flex items-center space-x-1 md:space-x-3">
								<li className="inline-flex items-center">
									<Link to="/HomePage">HomePage</Link>
								</li></ol>
						) : (
							<ol className="inline-flex items-center space-x-1 md:space-x-3">
								<li className="inline-flex items-center">HomePage</li></ol>
						)} */}
					{pathnames.map((name, index) => {
						const routeTo = `/${pathnames.slice(1, index + 1).join("/")}`;
						const isLast = index === pathnames.length - 1;
						return isLast ? (
							<ol className="inline-flex items-center space-x-1 md:space-x-3" key={index}> &gt;
								<li className="inline-flex items-center">{capatilize(name)}</li></ol>
						) : (
							<ol className="inline-flex items-center space-x-1 md:space-x-3" key={index}>&gt;
								<li className="inline-flex items-center">
									<Link to={`${routeTo}`}>{capatilize(name)}</Link>
								</li></ol>
						);
					})}
				</nav>
			</div>
		);
	};

	return (
		<>{breadCrumbView()}
			{/* {path.map((p) => <Link underline="hover" color="inherit">{p}</Link>).slice(0, path.length - 1)} */}
			{/* {path.map((p) => {return p}).slice(path.length - 1)} */}

			{/* <nav
				className="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Breadcrumb"
			>
			
				<ol className="inline-flex items-center space-x-1 md:space-x-3">
				<li className="inline-flex items-center">
						<Link
							to={"/"}
							className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
						>
							<svg
								className="mr-2 w-4 h-4"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
							</svg>
							
						</Link>
					</li>

				</ol>
			</nav> */}
		</>
	);
};

export default Breadcrumb;
