import Filter from "../components/Filter";
import { filterValuesData } from "../utils/filterValuesData";

let filterValues = filterValuesData;

function HomePage() {
  return (
    <>
      <Filter entries={filterValues} />
    </>
  );
}
export default HomePage;
