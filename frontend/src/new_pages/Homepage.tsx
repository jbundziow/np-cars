import CardCar from '../components/CardCar.tsx';
import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';
import ChartOne from '../components/ChartOne.tsx';
import ChartThree from '../components/ChartThree.tsx';
import ChartTwo from '../components/ChartTwo.tsx';
import ChatCard from '../components/ChatCard.tsx';
import MapOne from '../components/MapOne.tsx';
import TableOne from '../components/TableOne.tsx';

const Homepage = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <p>To jest strona główna!!</p>
        <CardCar/>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

     
    </>
  );
};

export default Homepage;
