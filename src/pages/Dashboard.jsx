import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { AiOutlineDownload } from "react-icons/ai";
import { usePDF } from "react-to-pdf";

import TicketDetailsModal from "../components/TicketDetailsModal";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
function Dashboard() {
  const [ticketState] = useTickets();
  const [selectedTicket, setSelectedTicket] = useState({});
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const columns = [
    {
      name: "Ticket Id",
      selector: (row) => row._id,
      reorder: true,
      grow: 1,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      reorder: true,
      grow: 1.25,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      reorder: true,
      grow: 2,
      sortable: true,
    },
    {
      name: "Reporter",
      selector: (row) => row.assignedTo,
      reorder: true,
      grow: 1.5,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.ticketPriority,
      reorder: true,
      sortable: true,
      grow: 0.5,
      center: true,
    },
    {
      name: "Assignee",
      selector: (row) => row.assignee,
      reorder: true,
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      reorder: true,
      sortable: true,
      center: true,
    },
  ];

  createTheme(
    "twilight",
    {
      text: {
        primary: "#e0e0e0",
        secondary: "#b0bec5",
      },
      background: {
        default: "#263238",
      },
      context: {
        background: "#37474f",
        text: "#FFFFFF",
      },
      divider: {
        default: "#455a64",
      },
      action: {
        button: "#4fc3f7",
        hover: "rgba(255, 255, 255, 0.1)",
        disabled: "rgba(255, 255, 255, 0.3)",
      },
    },
    "dark"
  );

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
        <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
          Tickets Records{" "}
          <AiOutlineDownload
            className="cursor-pointer inline "
            onClick={() => toPDF()}
          />
        </div>

        <div ref={targetRef}>
          {ticketState && (
            <DataTable
              columns={columns}
              data={ticketState.ticketList}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              theme="twilight"
              pagination
              fixedHeader
              highlightOnHover
              dense
              responsive
              pointerOnHover
              onRowClicked={(row) => {
                setSelectedTicket(row);
                document.getElementById("ticket_modal").showModal();
              }}
            />
          )}
          <TicketDetailsModal
            ticket={selectedTicket}
            key={selectedTicket._id}
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Dashboard;
