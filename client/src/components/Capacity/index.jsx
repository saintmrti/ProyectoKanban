import { Formulacion } from "./CapacityTable/dummyData";
import CapacityTable from "./CapacityTable";

const Capacity = () => {
  return (
    <div>
      <CapacityTable data={Formulacion.celda_1} />
    </div>
  );
};

export default Capacity;
