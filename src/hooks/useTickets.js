import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";
import {
  filterTickets,
  getAllCreatedTicketsforTheUser,
  getAllTicketsForAdmin,
  getAllTicketsforEngineer,
  resetTicketList,
} from "../Redux/Slices/TicketSlice";

function useTickets() {
  const authState = useSelector((state) => state.auth);
  const ticketState = useSelector((state) => state.tickets);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const loadTickets = useCallback(async () => {
    if (authState.role === "CUSTOMER") {
      const response = await dispatch(getAllCreatedTicketsforTheUser());
      if (response.error) {
        await dispatch(logout());
      }
    } else if (authState.role === "ADMIN") {
      const response = await dispatch(getAllTicketsForAdmin());
      if (response.error) {
        await dispatch(logout());
      }
    } else if (authState.role === "ENGINEER") {
      const response = await dispatch(getAllTicketsforEngineer());
      if (response.error) {
        await dispatch(logout());
      }
    }

    if (searchParams.get("status")) {
      // dispatch a filter action

      dispatch(filterTickets({ status: searchParams.get("status") }));
    } else {
      dispatch(resetTicketList());
    }
  }, [authState.role, searchParams, dispatch]);

  useEffect(() => {
    loadTickets();
  }, [authState.token, searchParams, loadTickets]);

  return [ticketState];
}

export default useTickets;
