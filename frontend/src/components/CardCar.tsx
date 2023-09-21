import ProductOne from '../images/product/product-01.png';

const CardCar = () => {
    return (
      <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='flex justify-center'>
        <img src={`https://ocdn.eu/pulscms-transforms/1/fCGk9kqTURBXy9mY2Y3MGRkOWE2OGZkODQzYmE4MmYxNmM3NWMzY2IwZi5qcGVnkpUDzIvNATrNBTrNAvGTBc0EsM0CpN4AAqEwAaExAA`} alt="Product" className='w-full border-2 rounded-md'/>
        </div>
          <p className='text-black dark:text-white'>Renault Megane</p>
        
      </div>
    );
  };
  
  export default CardCar;
  