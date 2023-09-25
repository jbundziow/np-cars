import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RepairsStatus = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Status napraw aut</h1>
      </>
    );
  };
  
  export default RepairsStatus