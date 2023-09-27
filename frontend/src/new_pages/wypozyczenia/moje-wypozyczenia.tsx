import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const MyRentals = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

  return (
    <>
    <Breadcrumb pageName="Moje wypożyczenia" />
    </>
  );
};

export default MyRentals;
