import { BsFillPencilFill } from "react-icons/bs";

import Card from "../../components/Card";
import HomeLayout from "../../layouts/HomeLayout";
function Home() {
  return (
    <HomeLayout>
      <div className="flex flex-row items-center justify-center gap-6 mt-6
      ">
        <Card>
          <BsFillPencilFill className="inline mr-2" />
        </Card>
        <Card
          status={30}
          quantity={65}
          background="bg-yellow-300"
          borderColor="border-green-300"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <BsFillPencilFill className="inline mr-2" />
        </Card>
        <Card>
          <BsFillPencilFill className="inline mr-2" />
        </Card>
        <Card>
          <BsFillPencilFill className="inline mr-2" />
        </Card>

      </div>
    </HomeLayout>
  );
}

export default Home;
