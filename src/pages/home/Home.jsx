import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useCharts from "../../hooks/useCharts";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";

function Home() {
  const [ticketsState] = useTickets();
  const [pieChartData, lineChartData, barChartData] = useCharts();

  return (
    <HomeLayout>
      {ticketsState && (
        <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
          <Card
            titleText="Open"
            status={
              ticketsState.ticketDistribution.OPEN /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.OPEN}
            background="bg-yellow-300"
            borderColor="border-green-300"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <BsFillPencilFill className="inline mr-2" />
          </Card>
          <Card
            titleText="In Progress"
            status={
              ticketsState.ticketDistribution.IN_PROGRESS /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.IN_PROGRESS}
            background="bg-orange-300"
            borderColor="border-red-300"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <TbProgressBolt className="inline mr-2" />
          </Card>
          <Card
            titleText="Resolved"
            status={
              ticketsState.ticketDistribution.RESOLVED /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.RESOLVED}
            background="bg-purple-300"
            borderColor="border-blue-700"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdOutlineDoneAll className="inline mr-2" />
          </Card>
          <Card
            titleText="On Hold"
            status={
              ticketsState.ticketDistribution.ON_HOLD /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.ON_HOLD}
            background="bg-gray-300"
            borderColor="border-gray-800"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdPending className="inline mr-2" />
          </Card>
          <Card
            titleText="Cancelled"
            status={
              ticketsState.ticketDistribution.CANCELLED /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.CANCELLED}
            background="bg-blue-300"
            borderColor="border-violet-300"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdCancel className="inline mr-2" />
          </Card>
        </div>
      )}

      <div className="mt-10 flex justify-center items-center gap-10">
        <div className="w-80 h-80 ">
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat]">
          <Line data={lineChartData} />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat]">
          <Bar data={barChartData} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default Home;
