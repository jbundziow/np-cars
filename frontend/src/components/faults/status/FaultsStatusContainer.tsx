import FaultsStatusCard from "./FaultsStatusCard";


const FaultsStatusContainer = () => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
          <FaultsStatusCard
          carID={1}
          carBrand={'Renault'}
          carModel={'Megane RS'}
          carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'}
          numberOfPendingFaults={0}
          numberOfFaultsInProgress={2}
          numberOfClosedFaults={13}
          />
          <FaultsStatusCard
          carID={2}
          carBrand={'Renault'}
          carModel={'Megane'}
          carImg={'https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA'}
          numberOfPendingFaults={0}
          numberOfFaultsInProgress={0}
          numberOfClosedFaults={3}
          />
          <FaultsStatusCard
          carID={3}
          carBrand={'Mercedes'}
          carModel={'Sprinter'}
          carImg={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'}
          numberOfPendingFaults={4}
          numberOfFaultsInProgress={1}
          numberOfClosedFaults={2}
          />
          <FaultsStatusCard
          carID={4}
          carBrand={'Renault'}
          carModel={'Traffic'}
          carImg={'https://image.ceneostatic.pl/data/products/140258533/i-renault-trafic-exclusive-2-0-115-km-2-x-klima.jpg'}
          numberOfPendingFaults={12}
          numberOfFaultsInProgress={33}
          numberOfClosedFaults={96}
          />
      </div>
      
    );
  };
  
  export default FaultsStatusContainer;
  