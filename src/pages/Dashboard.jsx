import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";

import TicketDetailsModal from "../components/TicketDetailsModal";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/HomeLayout";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
function Dashboard() {
  const [ticketState] = useTickets();

  const role = useSelector((state) => state.auth.role);

  const [selectedTicket, setSelectedTicket] = useState({});

  const columns = [
    {
      name: "Ticket Id",
      selector: (row) => row.id,
      reorder: true,
      grow: 1.5,
      sortable: true,
      cell: (row) => <div className="text-center">{row.id}</div>,
    },
    {
      name: "Title",
      selector: (row) => row.title.substring(0, 10) + "...",
      reorder: true,
      grow: 1.25,
      sortable: true,
      cell: (row) => (
        <div className="text-center">{row.title.substring(0, 10) + "..."}</div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.description.substring(0, 20) + "...",
      reorder: true,
      grow: 1.5,
      sortable: true,
      cell: (row) => (
        <div className="text-center">
          {row.description.substring(0, 20) + "..."}
        </div>
      ),
    },
    {
      name: "Reporter",
      selector: (row) => row.assignedTo,
      reorder: true,
      grow: 1.5,
      sortable: true,
      cell: (row) => <div className="text-center">{row.assignedTo}</div>,
    },
    {
      name: "Priority",
      selector: (row) => row.ticketPriority,
      reorder: true,
      sortable: true,
      grow: 0.5,
      cell: (row) => <div className="text-center">{row.ticketPriority}</div>,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      reorder: true,
      sortable: true,
      cell: (row) => <div className="text-center">{row.status}</div>,
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
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
          Tickets Records
        </div>

        <div className="w-full flex justify-center items-center"></div>
        {ticketState && (
          <DataTable
            onRowClicked={(row) => {
              setSelectedTicket(row);
              document.getElementById("ticket_modal").showModal();
            }}
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
          />
        )}
        {role != "CUSTOMER" && (
          <TicketDetailsModal
            ticket={selectedTicket}
            key={selectedTicket.id}
            id={selectedTicket.id}
          />
        )}
      </div>
    </HomeLayout>
  );
}

export default Dashboard;
