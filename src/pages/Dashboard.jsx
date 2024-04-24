import { useState } from "react";
import DataTable, { createTheme }  from "react-data-table-component";

import TicketDetailsModal from "../components/TicketDetailsModal";
import useTickets from "../hooks/useTickets";
import HomeLayout from "../layouts/Homelayout";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
function Dashboard() {
  const [ticketState] = useTickets();
  

  const [selectedTicket, setSelectedTicket] = useState({});

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
      name: "Assigned To",
      selector: (row) => row.assignedTo,
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
      
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
      <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
          Tickets Records
        </div>


        
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
          <TicketDetailsModal
            ticket={selectedTicket}
            key={selectedTicket._id}
            
          />
       
      </div>
    </HomeLayout> 
  );
}

export default Dashboard;
