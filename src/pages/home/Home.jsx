import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../layouts/HomeLayout";

function Home() {
  const [ticketsState] = useTickets();

  return (
    <HomeLayout>
      {ticketsState && (
        <div
          className="mt-10 flex w-4/5 flex-row justify-center items-center gap-x-24 gap-y-6 flex-wrap font-mono ...
      "
        >
          <Card
            titleText="Open"
            status={
              ticketsState.ticketDistribution.open /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.open}
            background="bg-yellow-300"
            borderColor="border-[#7E2F81]"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <BsFillPencilFill className="inline mr-2" />
          </Card>
          <Card
            titleText="In Progress"
            status={
              ticketsState.ticketDistribution.inProgress /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.inProgress}
            background="bg-orange-300"
            borderColor="border-[#87A4C5]"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <TbProgressBolt className="inline mr-2" />
          </Card>
          <Card
            titleText="Resolved"
            status={
              ticketsState.ticketDistribution.resolved /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.resolved}
            background="bg-purple-300"
            borderColor="border-[#FFF1BE]"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdOutlineDoneAll className="inline mr-2" />
          </Card>
          <Card
            titleText="On Hold"
            status={
              ticketsState.ticketDistribution.onHold /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.onHold}
            background="bg-gray-300"
            borderColor="border-[#F4E3D4]"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdPending className="inline mr-2" />
          </Card>
          <Card
            titleText="Cancelled"
            status={
              ticketsState.ticketDistribution.cancelled /
              ticketsState.downloadedTickets.length
            }
            quantity={ticketsState.ticketDistribution.cancelled}
            background="bg-blue-300"
            borderColor="border-[#FFA77D]"
            fontColor="text-black"
            dividerColor="bg-black"
          >
            <MdCancel className="inline mr-2" />
          </Card>
        </div>
      )}
    </HomeLayout>
  );
}

export default Home;
