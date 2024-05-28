import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useCallback, useEffect, useState } from "react";

import useTickets from "./useTickets";
ChartJS.register(
  ArcElement,
  Legend,
  Title,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

import { add, compareAsc, format } from "date-fns";

function useCharts() {
  const [ticketsState] = useTickets();
  const [ticketsChartData, setTicketsChartData] = useState({
    openTickets: [],
    inProgressTickets: [],
    resolvedTickets: [],
    onHoldTickets: [],
    cancelledTickets: [],
    openTicketsByMonth: [],
    resolvedTicketsByMonth: [],
    inProgressTicketsByMonth: [],
    onHoldTicketsByMonth: [],
    cancelledTicketsByMonth: [],
  });

  const pieChartData = {
    labels: Object.keys(ticketsState.ticketDistribution),
    fontColor: "white",
    datasets: [
      {
        label: "Tickets data",
        data: Object.values(ticketsState.ticketDistribution),
        backgroundColor: ["yellow", "orange", "purple", "gray", "blue"],
        borderColor: ["yellow", "orange", "purple", "gray", "blue"],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(ticketsChartData.openTickets),
    fontColor: "pink",

    datasets: [
      {
        label: "Open Tickets data",
        data: Object.values(ticketsChartData.openTickets),
        borderColor: "#0f1729",
        borderWidth: 3,
      },
      {
        label: "In Progress Tickets data",
        data: Object.values(ticketsChartData.inProgressTickets),
        borderColor: "#fdba74",
        borderWidth: 4,
      },
      {
        label: "Resolved Tickets data",
        data: Object.values(ticketsChartData.resolvedTickets),
        borderColor: "#d8b4fe",
        borderWidth: 5,
      },
      {
        label: "On Hold Tickets data",
        data: Object.values(ticketsChartData.onHoldTickets),
        borderColor: "#d1d5db",
        borderWidth: 2,
      },
      {
        label: "Cancelled Tickets data",
        data: Object.values(ticketsChartData.cancelledTickets),
        borderColor: "#93c5fd",
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Open",
        data: Object.values(ticketsChartData.openTicketsByMonth),
        backgroundColor: "#0f1729",
      },
      {
        label: "In Progress",
        data: Object.values(ticketsChartData.inProgressTicketsByMonth),
        backgroundColor: "#fdba74",
      },
      {
        label: "Resolved",
        data: Object.values(ticketsChartData.resolvedTicketsByMonth),
        backgroundColor: "#d8b4fe",
      },
      {
        label: "On Hold",
        data: Object.values(ticketsChartData.onHoldTicketsByMonth),
        backgroundColor: "#d1d5db",
      },
      {
        label: "Cancelled",
        data: Object.values(ticketsChartData.cancelledTicketsByMonth),
        backgroundColor: "#93c5fd",
      },
    ],
  };

  const processTickets = useCallback(() => {
    let currentDate = new Date();

    let tenthDayFromToday = add(currentDate, { days: -10 });

    if (ticketsState.ticketList.length > 0) {
      let openTicketsData = {};
      let inProgressTicketsData = {};
      let resolvedTicketsData = {};
      let onHoldTicketsData = {};
      let cancelledTicketsData = {};

      let openTicketsByMonth = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let inProgressTicketsByMonth = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let resolvedTicketsByMonth = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let onHoldTicketsByMonth = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };
      let cancelledTicketsByMonth = {
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      };

      for (let i = 0; i < 10; i++) {
        let dateObject = new Date();
        dateObject.setDate(currentDate.getDate() - i);
        let formattedDate = format(dateObject, "dd-MM-yy");
        openTicketsData[formattedDate] = 0;
        inProgressTicketsData[formattedDate] = 0;
        resolvedTicketsData[formattedDate] = 0;
        onHoldTicketsData[formattedDate] = 0;
        cancelledTicketsData[formattedDate] = 0;
      }

      // Process all the tickets one by one
      ticketsState.ticketList.forEach((ticket) => {
        const ticketDate = ticket.createdAt;
        const formattedTicketDate = format(new Date(ticketDate), "dd-MM-yy");

        const isFromLastTenDays =
          compareAsc(new Date(ticketDate), new Date(tenthDayFromToday)) >= 0;

        if (ticket.status == "OPEN" && isFromLastTenDays) {
          openTicketsData[formattedTicketDate] =
            openTicketsData[formattedTicketDate] + 1;
        } else if (ticket.status == "IN_PROGRESS" && isFromLastTenDays) {
          inProgressTicketsData[formattedTicketDate] =
            inProgressTicketsData[formattedTicketDate] + 1;
        } else if (ticket.status == "RESOLVED" && isFromLastTenDays) {
          resolvedTicketsData[formattedTicketDate] =
            resolvedTicketsData[formattedTicketDate] + 1;
        } else if (ticket.status == "ON_HOLD" && isFromLastTenDays) {
          onHoldTicketsData[formattedTicketDate] =
            onHoldTicketsData[formattedTicketDate] + 1;
        } else if (ticket.status == "CANCELLED" && isFromLastTenDays) {
          cancelledTicketsData[formattedTicketDate] =
            cancelledTicketsData[formattedTicketDate] + 1;
        }

        // month wise data
        let month = format(new Date(ticketDate), "MMMM");
        if (ticket.status == "OPEN") {
          openTicketsByMonth[month] += 1;
        }
        if (ticket.status == "RESOLVED") {
          resolvedTicketsByMonth[month] += 1;
        }
        if (ticket.status == "IN_PROGRESS") {
          inProgressTicketsByMonth[month] += 1;
        }

        if (ticket.status == "ON_HOLD") {
          onHoldTicketsByMonth[month] += 1;
        }

        if (ticket.status == "CANCELLED") {
          cancelledTicketsByMonth[month] += 1;
        }
      });
      //  update the state

      setTicketsChartData({
        openTickets: openTicketsData,
        inProgressTickets: inProgressTicketsData,
        resolvedTickets: resolvedTicketsData,
        onHoldTickets: onHoldTicketsData,
        cancelledTickets: cancelledTicketsData,
        openTicketsByMonth: openTicketsByMonth,
        resolvedTicketsByMonth: resolvedTicketsByMonth,
        inProgressTicketsByMonth: inProgressTicketsByMonth,
        onHoldTicketsByMonth: onHoldTicketsByMonth,
        cancelledTicketsByMonth: cancelledTicketsByMonth,
      });
    }
  }, [ticketsState]);

  useEffect(() => {
    processTickets();
  }, [processTickets]);

  return [pieChartData, lineChartData, barChartData];
}

export default useCharts;
