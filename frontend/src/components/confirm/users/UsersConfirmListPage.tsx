import { AuthType } from "../../../types/common";
import { db_User } from "../../../types/db_types";
import CardUser from "../../users/CardUserFlip";
import { NoActionRequiredMessage } from "../NoActionRequiredMessage";


type UsersConfirmListPageProps = {
  users: db_User[];
  auth: AuthType;
}

const UsersConfirmListPage = (props: UsersConfirmListPageProps) => {

const isUnconfirmedUserExist = props.users.some(user => user.role === 'unconfirmed');


  return (
  
      <>
      

        {isUnconfirmedUserExist ?
        <div>

          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {props.users.filter(user => user.role === 'unconfirmed').map(user => 
              <CardUser userData={user} primaryButtonText={'Potwierdź'} secondaryButton={{text: 'Edytuj', link: `/uzytkownicy/ustawienia-konta/${user.id}`}} auth={props.auth}/>
            )}
          </div>
        </div>
        :
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <NoActionRequiredMessage title={'Wszystko w porządku!'} text1={'W tej chwili nie ma w bazie danych użytkowników czekających na potwierdzenie.'} text2={'Miłego dnia!'} buttonText={'Przejdź do listy użytkowników'} buttonLink={'/uzytkownicy/zestawienie'}/>
        </div>
      }
      
      </>





  );
};

export default UsersConfirmListPage;
