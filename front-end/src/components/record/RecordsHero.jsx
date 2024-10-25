import HomeIcon from "./HomeIcon";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

const RecordsHero = () => {
  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <LeftArrow />
          <p className="mt-1">Last 30 days</p>
          <RightArrow />
        </div>
        <div>
          <select
            className="select select-bordered w-full max-w-xs"
            defaultValue="Newest first"
          >
            <option disabled value="Newest first">
              Newest first
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
      <div>
        <div className="card bg-base-100 rounded-box h-15 flex flex-row justify-between mt-4">
          <div className="flex items-center gap-3 p-3">
            <HomeIcon />
            <p>Lending & Renting</p>
          </div>

          <p className="flex items-center p-3 text-green-600 font-bold">
            + 1000₮
          </p>
        </div>
      </div>
    </div>
  );
};
export default RecordsHero;
