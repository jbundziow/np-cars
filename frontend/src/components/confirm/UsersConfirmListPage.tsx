import { AuthType } from "../../types/common";
import { db_User } from "../../types/db_types";
import CardUser from "../users/CardUser";
import { TEAnimation } from "tw-elements-react";


type UsersConfirmListPageProps = {
  users: db_User[];
  auth: AuthType;
}

const UsersConfirmListPage = (props: UsersConfirmListPageProps) => {

// const isUnconfirmedUserExist = props.users.some(user => user.role === 'unconfirmed');
const isUnconfirmedUserExist = false;

  return (
  
      <>
      

        {isUnconfirmedUserExist ?
        <div>

          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            {props.users.filter(user => user.role === 'unconfirmed').map(user => 
              <CardUser userData={user} primaryButton={{text: 'Potwierdź', link: `/potwierdzenia/nowi-uzytkownicy`}} secondaryButton={{text: 'Edytuj', link: `/uzytkownicy/ustawienia-konta/${user.id}`}} auth={props.auth}/>
            )}
          </div>
        </div>
        :
        <div className="bg-gray-100 h-screen">
        <div className="p-6  md:mx-auto">
          <div className="animate-bounce-once">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6 animate-wiggle-once">
              <path fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
              </path>
          </svg>
          </div>
          
          <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
              <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
              <p> Have a great day!  </p>
              <div className="py-10 text-center">
                  <a href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                      GO BACK 
                 </a>
              </div>
          </div>
      </div>
    </div>
      }
      
      </>





  );
};

export default UsersConfirmListPage;
