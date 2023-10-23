import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FaultDetailsContainer from '../../components/faults/details/FaultDetailsContainer'

interface Props {
    documentTitle: string;
  }

const RepairsStatusDetails = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Szczegóły dotyczące usterki" />
      <FaultDetailsContainer
      id={1}
      carID={1}
      carFullname={'Mercedes Sprinter'}
      carImg={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'}
      userID={1}
      userFullname={'Andrzej Nowak'}
      moderatorID={2}
      moderatorFullname={'Jan Kowalski'}
      lastChangeAt={'12.10.2023 14:20'}
      createdAt={'11.10.2023 12:34'}
      title={'Porysowany zderzak'}
      description={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta inventore quia numquam obcaecati nemo quaerat id aut, nobis animi possimus eum iure necessitatibus voluptate voluptatibus placeat beatae, nam, nulla quos.'}
      status={'pending'} //'pending' | 'accepted' | 'finished' | 'cancelled';
      resultDesctiption={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta inventore quia numquam obcaecati nemo quaerat id aut, nobis animi possimus eum iure necessitatibus voluptate voluptatibus placeat beatae, nam, nulla quos.'}
      repairCost={881.23}
      />
      </>
    );
  };
  
  export default RepairsStatusDetails