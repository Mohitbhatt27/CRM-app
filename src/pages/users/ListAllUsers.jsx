import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import UserDetailsModal from "../../components/UserDetailsModal";
import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
function ListAllUsers() {
  const columns = [
    {
      name: "User Id",
      selector: (row) => row._id,
      reorder: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      reorder: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row.userStatus,
      reorder: true,
    },
    {
      name: "Type",
      selector: (row) => row.userType,
      reorder: true,
      sortable: true,
    },
  ];

  const [userList, setUserList] = useState([]);

  const [userDisplay, setUserDisplay] = useState({
    name: "",
    email: "",
    userType: "",
    userStatus: "",
    clientName: "",
    id: "",
  });

  async function loadUsers() {
    const response = await axiosInstance.get("/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    setUserList(response?.data?.result);
  }

  useEffect(() => {
    loadUsers();
  }, []);

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
          List of all users{" "}
        </div>
        {userList && (
          <DataTable
            columns={columns}
            data={userList}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            theme="twilight"
            pagination
            fixedHeader
            highlightOnHover
            responsive
            striped
            dense
            subHeaderAlign="right"
            direction="auto"
            pointerOnHover
            onRowClicked={(row) => {
              setUserDisplay({
                name: row.name,
                email: row.email,
                userType: row.userType,
                userStatus: row.userStatus,
                clientName: row.clientName,
                id: row._id,
              });
              document.getElementById("user_details_modal").showModal();
            }}
          />
        )}
        <UserDetailsModal
          key={userDisplay.email}
          user={userDisplay}
          resetTable={loadUsers}
        />
      </div>
    </HomeLayout>
  );
}

export default ListAllUsers;
