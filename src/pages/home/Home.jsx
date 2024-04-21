import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
import { getAllTicketsforTheUser } from "../../Redux/Slices/TicketSlice";
function Home() {
  const authState = useSelector((state) => state.auth);
  const ticketsState = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  async function loadTickets() {
    const response = await dispatch(getAllTicketsforTheUser());
    console.log(response);
  }

  useEffect(() => {
    loadTickets();
  }, [authState.token]);

  return (
    <HomeLayout>
      <div
        className="mt-10 flex w-4/5 flex-row justify-center items-center gap-x-24 gap-y-6 flex-wrap font-mono ...
      "
      >
        <Card
          titleText="Open"
          status={
            ticketsState.ticketDistribution.open /
            ticketsState.ticketList.length
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
            ticketsState.ticketList.length
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
            ticketsState.ticketList.length
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
            ticketsState.ticketList.length
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
            ticketsState.ticketList.length
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
    </HomeLayout>
  );
}

export default Home;
