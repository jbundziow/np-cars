import { AuthType } from "../../types/common";
import { db_User } from "../../types/db_types";
import CardUser from "../CardUser";


type UsersListPageProps = {
  users: db_User[];
  auth: AuthType;
}

const UsersListPage = (props: UsersListPageProps) => {

const isBannedUserExist = props.users.some(user => user.role === 'banned');
const isUnconfirmedUserExist = props.users.some(user => user.role === 'unconfirmed');

  return (
  
      <>
      {props.users && props.users.length > 0
      ?
      <> 

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {props.users.filter(user => user.role !== 'banned' && user.role !== 'unconfirmed').map(user => <CardUser userData={user} primaryButton={{text: 'Szczegóły', link: `/uzytkownicy/${user.id}`}} secondaryButton={{text: 'Edytuj', link: `/uzytkownicy/ustawienia-konta/${user.id}`}} auth={props.auth}/>)}
      </div>






        {props.auth.userRole === 'admin' ?
        <>

        {isBannedUserExist ?
        <div>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white mt-40 mb-3">Zbanowani użytkownicy:</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {props.auth.userRole === 'admin' && props.users.filter(user => user.role === 'banned').map(user => 
              <CardUser userData={user} primaryButton={{text: 'Szczegóły', link: `/uzytkownicy/${user.id}`}} secondaryButton={{text: 'Edytuj', link: `/uzytkownicy/ustawienia-konta/${user.id}`}} auth={props.auth}/>
            )}
          </div>
        </div>
        :
        null
        }

        {isUnconfirmedUserExist ?
        <div>
          <h2 className="text-title-md2 font-semibold text-black dark:text-white mt-40 mb-3">Nowi użytkownicy do potwierdzenia:</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {props.auth.userRole === 'admin' && props.users.filter(user => user.role === 'unconfirmed').map(user => 
              <CardUser userData={user} primaryButton={{text: 'Potwierdź', link: `/potwierdzenia/nowi-uzytkownicy`}} secondaryButton={{text: 'Edytuj', link: `/uzytkownicy/ustawienia-konta/${user.id}`}} auth={props.auth}/>
            )}
          </div>
        </div>
        :
        null
        }


        </>
        :
        null
        }




      </>
      :
      <p className="text-black dark:text-white text-md text-center mb-4">Brak użytkowników do wyświetlenia.</p>
      }
      
      </>





  );
};

export default UsersListPage;
