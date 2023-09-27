import { useEffect} from 'react';
import Breadcrumb from '../components/Breadcrumb';


import CardCar from '../components/CardCar.tsx';
import CardFour from '../components/CardFour.tsx';
import CardOne from '../components/CardOne.tsx';
import CardThree from '../components/CardThree.tsx';
import CardTwo from '../components/CardTwo.tsx';


interface Props {
  documentTitle: string;
}

const Homepage = (props: Props) => {
  useEffect(() => {document.title = `${props.documentTitle}`}, []);
  return (
    <>
    <Breadcrumb pageName="Strona główna" />
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
