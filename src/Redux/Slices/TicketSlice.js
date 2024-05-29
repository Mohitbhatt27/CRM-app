import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  downloadedTickets: [],
  ticketList: [],
  ticketDistribution: {
    OPEN: 0,
    IN_PROGRESS: 0,
    RESOLVED: 0,
    ON_HOLD: 0,
    CANCELLED: 0,
  },
};
export const getAllTicketsForAdmin = createAsyncThunk(
  "tickets/getAllTicketsForAdmin",
  async () => {
    try {
      const response = axiosInstance.get("tickets/allTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      toast.promise(response, {
        success: "Successfully loaded all the tickets",
        loading: "Fetching tickets",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAllCreatedTicketsforTheUser = createAsyncThunk(
  "tickets/getMyCreatedTickets",
  async () => {
    try {
      const response = axiosInstance.get("tickets/createdTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      toast.promise(response, {
        success: "Successfully loaded all the tickets",
        loading: "Fetching tickets belonging to you",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getAllTicketsforEngineer = createAsyncThunk(
  "tickets/getAllTicketsforEngineer",
  async () => {
    try {
      const response = axiosInstance.get("tickets/assignedTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      toast.promise(response, {
        success: "Successfully loaded all the tickets",
        loading: "Fetching tickets belonging to you",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticket) => {
    try {
      const response = axiosInstance.post(
        `tickets/create`,
        ticket, // req body
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      toast.promise(response, {
        success: "Successfully created the ticket",
        loading: "Creating the ticket",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async (ticket) => {
    try {
      const response = axiosInstance.patch(
        `tickets/update/${ticket.id}`,
        {
          status: ticket.status,
          ticketPriority: ticket.ticketPriority,
          description: ticket.description,
        }, // req body
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      toast.promise(response, {
        success: "Successfully updated the ticket",
        loading: "Updating the ticket",
        error: "Something went wrong",
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    filterTickets: (state, action) => {
      let status = action.payload.status.toUpperCase();
      if (status === "ON HOLD") status = "ON_HOLD";
      if (status === "IN PROGRESS") status = "IN_PROGRESS";

      const filteredTickets = current(state).downloadedTickets.filter(
        (ticket) => ticket.status === status
      );

      state.ticketList = filteredTickets;
    },
    resetTicketList: (state) => {
      state.ticketList = state.downloadedTickets;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCreatedTicketsforTheUser.fulfilled, (state, action) => {
        if (!action?.payload?.data) return;
        state.ticketList = action?.payload?.data?.data;
        state.downloadedTickets = action?.payload?.data?.data;
        const tickets = action?.payload?.data?.data;
        state.ticketDistribution = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          ON_HOLD: 0,
          CANCELLED: 0,
        };
        tickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] =
            state.ticketDistribution[ticket.status] + 1;
        });
      })
      .addCase(getAllTicketsforEngineer.fulfilled, (state, action) => {
        if (!action?.payload?.data) return;
        state.ticketList = action?.payload?.data?.data;
        state.downloadedTickets = action?.payload?.data?.data;
        const tickets = action?.payload?.data?.data;
        state.ticketDistribution = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          ON_HOLD: 0,
          CANCELLED: 0,
        };
        tickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] =
            state.ticketDistribution[ticket.status] + 1;
        });
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload.data.result;
        state.ticketList = state.ticketList.map((ticket) => {
          if (ticket.id == updatedTicket.id) return updatedTicket;
          return ticket;
        });
        state.downloadedTickets = state.downloadedTickets.map((ticket) => {
          if (ticket.id == updatedTicket.id) return updatedTicket;
          return ticket;
        });
        state.ticketDistribution = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          ON_HOLD: 0,
          CANCELLED: 0,
        };
        state.downloadedTickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] =
            state.ticketDistribution[ticket.status] + 1;
        });
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        if (action?.payload?.data == undefined) return;
        const newTicket = action.payload.data;

        state.downloadedTickets = [...state.downloadedTickets, newTicket.data];

        state.ticketList = [...state.downloadedTickets];

        state.ticketDistribution = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          ON_HOLD: 0,
          CANCELLED: 0,
        };

        state.downloadedTickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] += 1;
        });
      })
      .addCase(getAllTicketsForAdmin.fulfilled, (state, action) => {
        if (!action?.payload?.data) return;
        state.ticketList = action?.payload?.data?.data;
        state.downloadedTickets = action?.payload?.data?.data;
        const tickets = action?.payload?.data?.data;
        state.ticketDistribution = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
          ON_HOLD: 0,
          CANCELLED: 0,
        };
        tickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] =
            state.ticketDistribution[ticket.status] + 1;
        });
      });
  },
});

export const { filterTickets, resetTicketList } = ticketSlice.actions;

export default ticketSlice.reducer;
