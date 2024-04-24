import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  filterTickets,
  getAllTicketsforTheUser,
  resetTicketList,
} from "../Redux/Slices/TicketSlice";

function useTickets() {
  const authState = useSelector((state) => state.auth);
  const ticketState = useSelector((state) => state.tickets);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  async function loadTickets() {
    if (ticketState.downloadedTickets.length == 0) {
      await dispatch(getAllTicketsforTheUser());
    }
    if (searchParams.get("status")) {
      dispatch(
        filterTickets({
          status: searchParams.get("status"),
        })
      );
    } else {
      dispatch(resetTicketList());
    }
  }

  useEffect(() => {
    loadTickets();
  }, [authState.token, searchParams.get("status"),ticketState.ticketDistribution]);

  return [ticketState];
}

export default useTickets;
