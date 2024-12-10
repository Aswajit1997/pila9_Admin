import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the plugin
import React from "react";
import { CSVLink } from "react-csv";
import { RxCross2 } from "react-icons/rx";
import CsvIcon from "../../assets/svg/CsvIcon.svg?react";
import DownloadButton from "../../assets/svg/DownloadButton.svg?react";
import PdfIcon from "../../assets/svg/PdfIcon.svg?react";
import styles from "./DownloadPopup.module.scss";

const DownloadPopup = ({ setOpenDownloadPopup, data }) => {
	const headers = [
		{ label: "UniqueID", key: "UniqueID" },
		{ label: "CoListAgentFullName", key: "CoListAgentFullName" },
		{ label: "CoListAgentMlsId", key: "CoListAgentMlsId" },
		{ label: "ListAgentFullName", key: "ListAgentFullName" },
		{ label: "ListAgentMlsId", key: "ListAgentMlsId" },
	];

	// Generate PDF
	const handleDownloadPdf = () => {
		const keys = Object.keys(data[0]);
		console.log(keys);
		const doc = new jsPDF();
		const tableColumn = headers.map((header) => header.label); // Table headers
		const tableRows = data.map((row) => headers.map((header) => row[header.key] || "N/A")); // Table rows

		// Add title to PDF
		doc.text("Data Table", 14, 15);

		// Add table to PDF
		doc.autoTable({
			head: [tableColumn],
			body: tableRows,
		});

		// Save the PDF
		doc.save("DataTable.pdf");
	};

	return (
		<div className={styles.DownloadPopup} onClick={() => setOpenDownloadPopup(false)}>
			<div className={styles.Wrapper} onClick={(e) => e.stopPropagation()}>
				<div className={styles.Top}>
					<h3>Download</h3>
					<RxCross2 onClick={() => setOpenDownloadPopup(false)} />
				</div>

				<div className={styles.Box} onClick={handleDownloadPdf}>
					<span>
						<PdfIcon />
						<p>Download as PDF </p>
					</span>
					<DownloadButton />
				</div>
				<div className={styles.Box}>
					<span>
						<CsvIcon />
						<p>
							<CSVLink data={data} headers={headers} filename={"DataTable.csv"}>
								Download as CSV
							</CSVLink>
						</p>
					</span>
					<DownloadButton />
				</div>
			</div>
		</div>
	);
};

export default DownloadPopup;
