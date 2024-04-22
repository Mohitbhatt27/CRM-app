import { useNavigate } from "react-router-dom";


function Card({
  children,
  fontColor = "text-white",
  borderColor = "border-error",
  dividerColor = "bg-gray-100",
  background = "bg-primary",
  titleText = "Card",
  status = 50,
  quantity = 50,
}) {
  const navigate = useNavigate();
  function handleOnClick() {
    navigate(`/dashboard?status=${titleText}`);
  }
  return (
    <div onClick = {(children)=>handleOnClick(children)} 
      className={`border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 ... hover:cursor-pointer`}
    >
      <div className="text-primary-content text-2xl mb-0.5">
        {children} <span>{titleText}</span>
      </div>

      <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div>

      <div className="flex justify-around gap-4 items-center mt-2">
        <div className={`text-7xl ${fontColor}`}>{quantity}</div>
        <div
          className={`radial-progress ${fontColor}`}
          style={{ "--value": status * 100 }}
        >
          {(status * 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
}

export default Card;