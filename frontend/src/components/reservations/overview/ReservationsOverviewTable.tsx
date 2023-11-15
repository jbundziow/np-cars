import ReservationsOverviewTableRow from "./ReservationsOverviewTableRow";

type reservationType = {
  date: Date,
  reservation: boolean,
  userID: number | null,
  userName: string | null,
}

type carData = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
  reservations: reservationType[]
}
interface ReservationsOverviewTableProps {
  data: carData[];
}


const ReservationsOverviewTable = (props: ReservationsOverviewTableProps) => {
    return (
      <div className=" md:block rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white xl:pl-11">
                  Samochód
                </th>
                <th className="py-4 px-4 font-medium text-xs sm:text-base text-black dark:text-white">
                  Rezerwacje na najbliższe 2 tygodnie
                </th>
              </tr>
            </thead>
            <tbody>
            <div className='py-2' />
               {/* INSERT ROWS HERE */}
              {props.data.map(carData => 
                <ReservationsOverviewTableRow
                carID={carData.id} 
                carBrand={carData.brand}
                carModel={carData.model}
                carImg={carData.imgPath}
                
              //   twoWeeksData={[
              //      { day: 'czw.', isBooked: true, name: 'Hubert Łoś'},
              //      { day: 'pt.', isBooked: false, name: ''},
              //      { day: 'sob.', isBooked: false, name: ''},
              //      { day: 'ndz.', isBooked: true, name: 'Grzegorz Brzęczyszczykiewicz'},
              //      { day: 'pon.', isBooked: false, name: ''},
              //      { day: 'wt.', isBooked: false, name: ''},
              //      { day: 'śr.', isBooked: true, name: 'Jan Kowalski'},
              //      { day: 'czw.', isBooked: false, name: ''},
              //      { day: 'pt.', isBooked: false, name: ''},
              //      { day: 'sob.', isBooked: false, name: ''},
              //      { day: 'ndz.', isBooked: false, name: ''},
              //      { day: 'pon.', isBooked: true, name: 'Kinga Jońska'},
              //      { day: 'wt.', isBooked: false, name: ''},
              //      { day: 'śr.', isBooked: false, name: ''},
              //      { day: 'czw.', isBooked: true, name: 'Andrzej Kuś'}
              //  ]}
              twoWeeksData={carData.reservations}
               />
                )}
               
              {/* <ReservationsOverviewTableRow
               carID={2} 
               carBrand={'Mercedes'}
               carModel={'Sprinter'}
               carImg={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'}
               twoWeeksData={[
                  { day: 'czw.', isBooked: false, name: ''},
                  { day: 'pt.', isBooked: false, name: ''},
                  { day: 'sob.', isBooked: false, name: ''},
                  { day: 'ndz.', isBooked: false, name: ''},
                  { day: 'pon.', isBooked: false, name: ''},
                  { day: 'wt.', isBooked: false, name: ''},
                  { day: 'śr.', isBooked: true, name: 'Jan Kowalski'},
                  { day: 'czw.', isBooked: false, name: ''},
                  { day: 'pt.', isBooked: false, name: ''},
                  { day: 'sob.', isBooked: false, name: ''},
                  { day: 'ndz.', isBooked: false, name: ''},
                  { day: 'pon.', isBooked: true, name: 'Michał Jach'},
                  { day: 'wt.', isBooked: true, name: 'Michał Jach'},
                  { day: 'śr.', isBooked: true, name: 'Michał Jach'},
                  { day: 'czw.', isBooked: false, name: ''}
              ]}/>
              <ReservationsOverviewTableRow
               carID={3} 
               carBrand={'Renault'}
               carModel={'Traffic'}
               carImg={'https://image.ceneostatic.pl/data/products/140258533/i-renault-trafic-exclusive-2-0-115-km-2-x-klima.jpg'}
               twoWeeksData={[
                  { day: 'czw.', isBooked: false, name: ''},
                  { day: 'pt.', isBooked: false, name: ''},
                  { day: 'sob.', isBooked: false, name: ''},
                  { day: 'ndz.', isBooked: false, name: ''},
                  { day: 'pon.', isBooked: true, name: 'Tomasz Kloc'},
                  { day: 'wt.', isBooked: true, name: 'Tomasz Kloc'},
                  { day: 'śr.', isBooked: false, name: ''},
                  { day: 'czw.', isBooked: true, name: 'Sandra Lewandowska'},
                  { day: 'pt.', isBooked: true, name: 'Sandra Lewandowska'},
                  { day: 'sob.', isBooked: false, name: ''},
                  { day: 'ndz.', isBooked: false, name: ''},
                  { day: 'pon.', isBooked: false, name: ''},
                  { day: 'wt.', isBooked: false, name: ''},
                  { day: 'śr.', isBooked: false, name: ''},
                  { day: 'czw.', isBooked: false, name: ''}
              ]}/> */}

            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ReservationsOverviewTable;