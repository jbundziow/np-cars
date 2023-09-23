import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RentACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <h1>Wypożycz samochód</h1>
        </div>
      </>
    );
  };
  
  export default RentACar
  