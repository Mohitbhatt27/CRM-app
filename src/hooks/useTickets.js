import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

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
      await dispatch(getAllCreatedTicketsforTheUser());
    } else if (authState.role === "ADMIN") {
      await dispatch(getAllTicketsForAdmin());
    } else {
      await dispatch(getAllTicketsforEngineer());
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
