import { AuthType } from "../../../types/common";
import { db_Car_basic } from "../../../types/db_types";
import CardCar from "./CardCar";



type CarsListPageProps = {
  cars: db_Car_basic[];
  auth: AuthType;
}

const CarsListPage = (props: CarsListPageProps) => {

const isBannedCarExist = props.cars.some(car => car.availabilityStatus === 'banned');


  return (
  
      <>
      {props.cars && props.cars.length > 0 && (!props.cars.every(car => car.availabilityStatus === 'banned') || props.auth.userRole === 'admin')
      ?
      <> 

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {props.cars.filter(car => car.availabilityStatus !== 'banned').map(car => <CardCar carData={car} primaryButton={{text: 'Szczegóły', link: `/samochody/${car.id}`}} secondaryButton={{text: 'Edytuj', link: `/samochody/edycja/${car.id}`}} auth={props.auth}/>)}
      </div>






        {props.auth.userRole === 'admin' ?
        <>

        {isBannedCarExist ?
        <div>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white mt-40 mb-3">Zbanowane samochody:</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {props.auth.userRole === 'admin' && props.cars.filter(car => car.availabilityStatus === 'banned').map(car => 
              <CardCar carData={car} primaryButton={{text: 'Szczegóły', link: `/samochody/${car.id}`}} secondaryButton={{text: 'Edytuj', link: `/samochody/edycja/${car.id}`}} auth={props.auth}/>
            )}
          </div>
        </div>
        :
        null
        }



        </>
        :
        null
        }




      </>
      :
      <p className="text-black dark:text-white text-md text-center mb-4">Brak samochodów do wyświetlenia.</p>
      }
      
      </>





  );
};

export default CarsListPage;
