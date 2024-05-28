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

import { compareAsc, format } from "date-fns";

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
    fontColor: "white",
    datasets: [
      {
        label: "Open Tickets data",
        data: Object.values(ticketsChartData.openTickets),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 3,
      },
      {
        label: "In Progress Tickets data",
        data: Object.values(ticketsChartData.inProgressTickets),
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 4,
      },
      {
        label: "Resolved Tickets data",
        data: Object.values(ticketsChartData.resolvedTickets),
        borderColor: "rgb(245, 205, 95)",
        borderWidth: 5,
      },
      {
        label: "On Hold Tickets data",
        data: Object.values(ticketsChartData.onHoldTickets),
        borderColor: "rgb(191, 44, 88)",
        borderWidth: 2,
      },
      {
        label: "Cancelled Tickets data",
        data: Object.values(ticketsChartData.cancelledTickets),
        borderColor: "rgb(119 145, 77)",
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
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "In Progress",
        data: Object.values(ticketsChartData.inProgressTicketsByMonth),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Resolved",
        data: Object.values(ticketsChartData.resolvedTicketsByMonth),
        backgroundColor: "rgba(53, 100, 235, 0.5)",
      },
      {
        label: "On Hold",
        data: Object.values(ticketsChartData.onHoldTicketsByMonth),
        backgroundColor: "rgba(53, 200, 235, 0.5)",
      },
      {
        label: "Cancelled",
        data: Object.values(ticketsChartData.cancelledTicketsByMonth),
        backgroundColor: "rgba(53, 300, 235, 0.5)",
      },
    ],
  };

  const processTickets = useCallback(() => {
    // Fetch the current Date
    let currentDate = new Date();
    // Calculate the 10th date from today
    let tenthDayFromToday = new Date();
    tenthDayFromToday.setDate(currentDate.getDate() - 10);

    tenthDayFromToday = format(tenthDayFromToday, "dd-MM-yy");

    // Process all the tickets
    if (ticketsState.ticketList.length > 0) {
      // Prepare two localobjects to act as frequency map
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
        const ticketDate = format(ticket.createdAt, "dd-MM-yy");

        // If ticket is open and lies in the last 10 days add it
        if (
          ticket.status == "OPEN" &&
          compareAsc(ticketDate, tenthDayFromToday) >= 0
        ) {
          openTicketsData[ticketDate] = openTicketsData[ticketDate] + 1;
        }

        // If ticket is inProgress and lies in the last 10 days add it
        if (ticket.status == "IN_PROGRESS" && ticketDate >= tenthDayFromToday) {
          inProgressTicketsData[ticketDate] =
            inProgressTicketsData[ticketDate] + 1;
        }

        // If ticket is resolved and lies in the last 10 days add it
        if (ticket.status == "RESOLVED" && ticketDate >= tenthDayFromToday) {
          resolvedTicketsData[ticketDate] = resolvedTicketsData[ticketDate] + 1;
        }

        // If ticket is onHold and lies in the last 10 days add it
        if (ticket.status == "ON_HOLD" && ticketDate >= tenthDayFromToday) {
          onHoldTicketsData[ticketDate] = onHoldTicketsData[ticketDate] + 1;
        }

        // If ticket is cancelled and lies in the last 10 days add it
        if (ticket.status == "CANCELLED" && ticketDate >= tenthDayFromToday) {
          cancelledTicketsData[ticketDate] =
            cancelledTicketsData[ticketDate] + 1;
        }

        // month wise data
        let month = ticketDate.toLocaleString("default", { month: "long" });
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
