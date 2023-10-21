import { Link } from "react-router-dom";

const FaultDetailsContainer = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className='p-5 pt-0'>
        <img src={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'} alt="Product" className='w-full border-2 rounded-md'/>
        <p className='text-black dark:text-white pb-2 text-lg'>{'Mercedes'} {'Sprinter'}</p>
        <Link
        to={`#`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-2 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 mt-2`}
        >
        Zgłoś nową usterkę
        </Link>
        </div>

        <div className='col-span-3'>
        <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
            <h1>Porysowany zderzak</h1>
            <p>Status: W trakcie</p>
            <p>Usterka zgłoszona przez: Andrzej Nowak</p>
            <p>Data zgłoszenia usterki: 27.10.2023 11:32</p>
            <p>Usterka zaakceptowana przez moderatora: Szymon Radziszewski</p>
            <p>Data ostatniej zmiany statusu: 28.10.2023 19:44</p>
            <p>Szczegółowy opis problemu: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta inventore quia numquam obcaecati nemo quaerat id aut, nobis animi possimus eum iure necessitatibus voluptate voluptatibus placeat beatae, nam, nulla quos.</p>
            <p>Komentarz moderatora: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius beatae magnam error veritatis ducimus earum veniam quis ad quod aperiam? Ex voluptate dolore, accusamus est iste facere ut similique molestias!</p>
        </div>
        </div>
      </div>
      
    );
  };
  
  export default FaultDetailsContainer;
  