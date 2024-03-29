import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo-icon-dark.png';
import Img404Text from '../images/404page/404text.png';
import Img404Graphic from '../images/404page/graphic.png';



const NotFoundPage = () => {



  return (
    <div className="flex flex-col items-center p-6">
    <img src={Logo} alt="Logo" className='w-[150px]'/>
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        

        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div className="relative">
                <div className="absolute">
                    <div className="">
                        <h1 className="my-2 text-gray-800 font-bold text-2xl">
                            <strong>Błąd 404. ⛔</strong> Ups! Wygląda na to, że zawędrowałeś za daleko...
                        </h1>
                        <p className="mt-2 mb-6 text-gray-800">Ta strona nie istnieje 😲</p>
                        <Link
                        reloadDocument
                        to="/"
                        className="whitespace-nowrap sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                        >
                            Zabierz mnie stąd! ➡️
                        </Link>
                    </div>
                </div>
                <div>
                    <img src={Img404Text} alt="Napis 404"/>
                </div>
            </div>
        </div>

        <div>
            <img src={Img404Graphic} alt="Obrazek 404"/>
        </div>

    </div>
    </div>
  );
};

export default NotFoundPage;
