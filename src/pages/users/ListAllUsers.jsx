import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import UserDetailsModal from "../../components/UserDetailsModal";
import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

function ListAllUsers() {
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const columns = [
    {
      name: "User Id",
      selector: (row) => row.id,
      reorder: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      reorder: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
      center: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      reorder: true,
      sortable: true,
      center: true,
    },
  ];

  const [userList, setUserList] = useState([]);

  const [userDisplay, setUserDisplay] = useState({
    name: "",
    email: "",
    userType: "",
    clientName: "",
    id: "",
  });

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

  async function loadUsers() {
    const response = await axiosInstance.get("/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    setUserList(response?.data?.data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
          User List
        </div>
        {userList && (
          <DataTable
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

                role: row.userType,
                id: row.id,
              });
              document.getElementById("user_details_modal").showModal();
            }}
            columns={columns}
            data={userList}
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
