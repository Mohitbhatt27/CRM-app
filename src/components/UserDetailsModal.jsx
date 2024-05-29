import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDisplay, setUserDisplay] = useState(user);

  async function handleUserChange(e) {
    try {
      toast("Updating the user....");
      const response = await axiosInstance.patch(
        `users/updateRole/${userDisplay.id}`,

        {
          role: e.target.textContent,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (response?.data?.data) {
        toast.success("Successfully updated the user");
        const user = response?.data?.data;
        setUserDisplay({
          ...userDisplay,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        resetTable();
        document.getElementById("user_details_modal").close();
      }
    } catch (error) {
      console.log("printing error", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="w-full">
      <dialog id="user_details_modal" className="modal max-h-[90vh]">
        <div className="modal-box text-lg font-semibold ">
          <h3 className="font-bold text-lg">User Details</h3>
          <div className="py-4">
            Name: <span className="text-yellow-500"> {userDisplay.name}</span>
          </div>

          <div className="py-4">
            Email: <span className="text-yellow-500"> {userDisplay.email}</span>
          </div>

          <div className="py-4">
            Role:
            <span className="text-yellow-500">
              <details className="dropdown ml-2" id="userTypeDropdown">
                <summary>Click to update role</summary>
                <ul
                  name="role"
                  onClick={handleUserChange}
                  defaultValue="Select role"
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>CUSTOMER</a>
                  </li>
                  <li>
                    <a>ADMIN</a>
                  </li>
                  <li>
                    <a>ENGINEER</a>
                  </li>
                </ul>
              </details>
            </span>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default UserDetailsModal;
