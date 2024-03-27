import UserMale from '../../images/user/unknownUserMale.jpg'
import UserFemale from '../../images/user/unknownUserFemale.jpg'


import { useState } from "react";
import { db_User } from '../../types/db_types';
import { AuthType, warnings } from '../../types/common';
import { BACKEND_URL, BACKEND_IMG_URL } from '../../utilities/domainName';
import ImgLoader from '../../common/Loader/ImgLoader';
import OperationResult from '../general/OperationResult';
import ModalWarning from '../general/ModalWarning';
import { EditUserDataPageStatus } from '../../types/enums';
import FixedAlert, { alertOptionsObject } from '../general/FixedAlert';


interface UserSettingsFormProps {
  user: db_User;
  auth: AuthType;
}



const UserSettingsForm = (props: UserSettingsFormProps) => {
  const isAdmin = props.auth.userRole === 'admin' ? true : false;
  const isCurrentUser = Number(props.auth.userID) === props.user.id ? true : false;


  const [name, setName] = useState<string>(props.user.name);
  const [surname, setSurname] = useState<string>(props.user.surname);
  const [email, setEmail] = useState<string>(props.user.email);
  const [employedAs, setEmployedAs] = useState<string>(props.user.employedAs);
  const [gender, setGender] = useState<string>(props.user.gender);
  const [role, setRole] = useState<string>(props.user.role);


  const [image, setImage] = useState<File | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [newEmail, setNewEmail] = useState<string>('');





  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<EditUserDataPageStatus>(EditUserDataPageStatus.FillingTheForm)
  const [alertOptions, setAlertOptions] = useState<alertOptionsObject>({showAlert: false, color: 'danger', text: '#ERR#', dismiss_button: false, autohide: true, delay_ms: 1, key: 1});
  const [showWarningDeleteUserModal, setShowWarningDeleteUserModal] = useState<boolean>(false);
  const [showWarningEditUserDataModal, setShowWarningEditUserDataModal] = useState<boolean>(false);
  const [showWarningPasswordResetModal, setShowWarningPasswordResetModal] = useState<boolean>(false);
  const [showWarningChangeImageModal, setShowWarningChangeImageModal] = useState<boolean>(false);
  const [showWarningDeleteImageModal, setShowWarningDeleteImageModal] = useState<boolean>(false);
  const [showWarningChangeEmailModal, setShowWarningChangeEmailModal] = useState<boolean>(false);









  const editUserData = async () => {
    const editedUserData = {
      name: name,
      surname: surname,
      employedAs: employedAs,
      gender: gender,
      role: isAdmin ? role : null
    }
    
    try {
      const response = await fetch(`${BACKEND_URL}${isAdmin ? '/admin' : ''}/users/${props.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify(editedUserData)
      });

      if (response.ok) {
        setPageState(EditUserDataPageStatus.UserDataSuccessfullyEdited)

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditUserDataPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
    }
  }







  const deleteUser = async () => {

    try {
      const response = await fetch(`${BACKEND_URL}/admin/users/${props.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setPageState(EditUserDataPageStatus.UserDataSuccessfullyDeleted)

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditUserDataPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
    }
  }






  const changeImage = async () => {
    const formData = new FormData();
    if (image) {formData.append('image', image)}
    
    try {
      const response = await fetch(`${BACKEND_URL}/users/avatar/${props.user.id}`, {
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        setPageState(EditUserDataPageStatus.ImageSuccessfullyChanged)

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditUserDataPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
    }
  }







  const removeImage = async () => {

    try {
      const response = await fetch(`${BACKEND_URL}/users/avatar/${props.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
      });

      if (response.ok) {
        setAlertOptions(({showAlert: true, color: 'success', text: 'Pomyślnie usunięto avatar.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
        setImage(null);
        props.user.avatarPath = null;
      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
          
        }
        else {
          setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania obrazka. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
        }
      }
    }
    catch (error) {
      setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas usuwania obrazka. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 5000, key: Math.random()}))
    }
  }








  const changePassword = async () => {
    setShowWarningPasswordResetModal(false);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/password_reset_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({email})
      });

      if (response.ok) {
        setAlertOptions(({showAlert: true, color: 'success', text: `Na adres email ${email} został wysłany link do zmiany hasła użytkownika ${props.user.name} ${props.user.surname}. Powinien się on pojawić w ciągu kilku minut. Pamiętaj o sprawdzeniu zakładki SPAM. Link jest aktywny 24 godziny.`, dismiss_button: true, autohide: true, delay_ms: 10000, key: Math.random()}))
      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setAlertOptions(({showAlert: true, color: 'danger', text: `Wystąpił błąd: ${responseJSON.data[0].pl}`, dismiss_button: true, autohide: true, delay_ms: 10000, key: Math.random()}))
          
        }
        else {
          setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas wysyłania linku do zmiany hasła. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
        }
      }
    }
    catch (error) {
      setAlertOptions(({showAlert: true, color: 'danger', text: 'Wystąpił błąd podczas wysyłania linku do zmiany hasła. Spróbuj ponownie później.', dismiss_button: true, autohide: true, delay_ms: 7000, key: Math.random()}))
    }
  }




  
  const changeEmail = async () => {

    try {
      const response = await fetch(`${BACKEND_URL}/auth/email_change_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({old_email: email, new_email: newEmail})
      });

      if (response.ok) {
        setPageState(EditUserDataPageStatus.LinkToEmailChangeSuccessfullySent)

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditUserDataPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditUserDataPageStatus.ErrorWithSendingForm);
    }
  }







  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
    const selectedImage = event.target.files[0]; // Get the selected file
    setImage(selectedImage); // Store the selected file in the component's state
    }
  };



  return (
    <>
    <ModalWarning showModal={showWarningDeleteUserModal} setShowModal={(state: boolean) => setShowWarningDeleteUserModal(state)} title= {'Usuń użytkownika'} bodyText={`Czy na pewno chcesz usunąć tego użytkownika z bazy danych? Zaleca się zmienę typu użytkownika na "Zbanowany", aby nie utracić wszystkich archiwalnych danych. Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteUser() }/>
    <ModalWarning showModal={showWarningEditUserDataModal} setShowModal={(state: boolean) => setShowWarningEditUserDataModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany i zaktualizować je w bazie danych? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editUserData() }/>
    <ModalWarning showModal={showWarningPasswordResetModal} setShowModal={(state: boolean) => setShowWarningPasswordResetModal(state)} title= {'Resetowanie hasła'} bodyText={`Czy na pewno chcesz dokonać zmiany hasła? Spowoduje to wysłanie linku do zmiany hasła na adres email: ${props.user.email}. Link będzie aktywny przez najbliższe 24 godziny.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, wyślij link do zmiany hasła'} callback={ async () => await changePassword() }/>
    <ModalWarning showModal={showWarningChangeImageModal} setShowModal={(state: boolean) => setShowWarningChangeImageModal(state)} title= {'Zmień avatar'} bodyText={`Czy na pewno chcesz zmienić avatar użytkownika?`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zmień zdjęcie'} callback={ async () => await changeImage() }/>
    <ModalWarning showModal={showWarningDeleteImageModal} setShowModal={(state: boolean) => setShowWarningDeleteImageModal(state)} title= {'Zmień avatar'} bodyText={`Czy na pewno chcesz usunąć zdjęcie użytkownika?`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń zdjęcie'} callback={ async () => await removeImage() }/>
    <ModalWarning showModal={showWarningChangeEmailModal} setShowModal={(state: boolean) => setShowWarningChangeEmailModal(state)} title= {'Zmień adres email'} bodyText={`Czy na pewno chcesz zmienić adres email przypisany do konta ${props.user.name} ${props.user.surname} na ${newEmail}?`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, chcę dokonać zmiany'} callback={ async () => await changeEmail() }/>
    <FixedAlert options={alertOptions}/>

      <div className="mx-auto max-w-270">
        
        {isAdmin || isCurrentUser ?
        <>
        {pageState === EditUserDataPageStatus.FillingTheForm ?
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Informacje osobiste
                </h3>
              </div>
              <div className="p-7">
                <form action="#">




                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Imię
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}

                        />
                      </div>
                    </div>




                    
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Nazwisko
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="surname"
                          id="surname"
                          value={surname}
                          onChange={(e)=>setSurname(e.target.value)}

                        />
                      </div>
                    </div>





                  </div>

















                  
                  
                    <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="emailAddress"
                        >
                          Adres email
                        </label>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-3/4">
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary disabled:cursor-not-allowed"
                            type="email"
                            name="emailAddress"
                            id="emailAddress"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/4 flex justify-center items-center">
                      <button
                        className="rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1 w-full h-full sm:text-xs hover:bg-opacity-90"
                        type="button"
                        onClick={()=> setPageState(EditUserDataPageStatus.ChangeEmailForm)}
                      >
                        Zmień adres email
                      </button>

                      </div>

                    </div>
                    

                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="employedAs"
                    >
                      Stanowisko pracy
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="employedAs"
                      id="employedAs"
                      value={employedAs}
                      onChange={(e)=>setEmployedAs(e.target.value)}
                    />
                  </div>

                  












                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    


                  <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Płeć
                      </label>


                      <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path fill="#3C50E0" d="M176 288a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM352 176c0 86.3-62.1 158.1-144 173.1V384h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H208v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V448H112c-17.7 0-32-14.3-32-32s14.3-32 32-32h32V349.1C62.1 334.1 0 262.3 0 176C0 78.8 78.8 0 176 0s176 78.8 176 176zM271.9 360.6c19.3-10.1 36.9-23.1 52.1-38.4c20 18.5 46.7 29.8 76.1 29.8c61.9 0 112-50.1 112-112s-50.1-112-112-112c-7.2 0-14.3 .7-21.1 2c-4.9-21.5-13-41.7-24-60.2C369.3 66 384.4 64 400 64c37 0 71.4 11.4 99.8 31l20.6-20.6L487 41c-6.9-6.9-8.9-17.2-5.2-26.2S494.3 0 504 0H616c13.3 0 24 10.7 24 24V136c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L545 140.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176c-50.5 0-96-21.3-128.1-55.4z"/></svg>
                            </span>
                            <select className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                            >
                                <option value="male">Mężczyzna</option>
                                <option value="female">Kobieta</option>

                            </select>
                        </div>
                    </div>










                    {isAdmin ?
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Typ użytkownika
                      </label>


                      <div className="relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#3C50E0" d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
                            </span>
                            <select className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary disabled:cursor-not-allowed"
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            disabled={isCurrentUser && isAdmin ? true : false}
                            >
                                <option value="user">Zwykły użytkownik</option>
                                <option value="unconfirmed">Niepotwierdzony użytkownik</option>
                                <option value="admin">Administrator</option>
                                <option value="banned">Zbanowany</option>
                            </select>
                        </div>
                    </div>
                    :
                    null
                    }





                  </div>















                  <div className="flex flex-col sm:flex-row justify-between gap-4.5">

                    <button
                        className="flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1 hover:bg-opacity-90"
                        type="button"
                        onClick={() => setShowWarningPasswordResetModal(true)}
                      >
                        Resetuj hasło
                      </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="button"
                      onClick={() => setShowWarningEditUserDataModal(true)}
                      
                    >
                      Zatwierdź zmiany
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>








          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Avatar użytkownika
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">

                    <div className="h-14 w-14 rounded-full border-2 overflow-hidden">

                    {imgLoaded ? null : (
                      <ImgLoader/>
                    )}
                    <img
                    src={props.user.avatarPath !== null && image === null ? `${BACKEND_IMG_URL}${props.user.avatarPath}` : image !== null ? URL.createObjectURL(image) : props.user.gender === 'female' ? UserFemale : UserMale}
                    style={imgLoaded ? {} : { display: 'none' }}
                    onLoad={() => setImgLoaded(true)}
                    alt="Avatar użytkownika"
                    className='w-full h-full border-2 rounded-full object-cover'
                    />
                    </div>

                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edytuj zdjęcie
                      </span>
                      <span className="flex gap-2.5">
                        {props.user.avatarPath !== null ?
                        <button className="text-sm hover:text-primary"
                        type='button'
                        onClick={() => setShowWarningDeleteImageModal(true)}
                        
                        >
                          Usuń
                        </button>
                        :
                        null
                        }

                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept=".jpg, .jpeg, .png, .webp"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleImageChange}
                    />
                    {image === null ?
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Kliknij tutaj</span> lub
                        przeciągnij i upuść plik
                      </p>
                      <p className="mt-1.5">PNG, JPG, JPEG lub WEBP</p>
                      <p>(max 10MB, zalecany format 1:1)</p>
                    </div>
                    :
                    <p className="text-black dark:text-white font-bold">Zdjęcie zostało pomyślnie załadowane. Kliknij przycisk poniżej, aby zaakceptować zmianę avatara.</p>
                    }

                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70 disabled:cursor-not-allowed"
                      type='button'
                      disabled={image === null}
                      onClick={() => setShowWarningChangeImageModal(true)}
                    >
                      Wgraj nowe zdjęcie
                    </button>
                  </div>



                  {isAdmin && !isCurrentUser ?
                  <div className="flex mt-12 border rounded-lg p-2">
                    <button
                      className="flex justify-center w-full rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type="button"
                      onClick={() => setShowWarningDeleteUserModal(true)}
                    >
                      ⚠️ Usuń CAŁKOWICIE konto użytkownika ⚠️
                    </button>
                  </div>
                  :
                  null
                  }



                </form>
              </div>
            </div>
          </div>
        </div>
        :
        pageState === EditUserDataPageStatus.UserDataSuccessfullyEdited ?
          <OperationResult status={'success'} title={'Dokonano edycji danych dotyczących użytkownika 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/uzytkownicy/${props.user.id}`}/>
        :
        pageState === EditUserDataPageStatus.UserDataSuccessfullyDeleted ?
          <OperationResult status={'success'} title={'Usunięto użytkownika 👍'} description={'Dane zostały usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/uzytkownicy/zestawienie`}/>
        :
        pageState === EditUserDataPageStatus.ImageSuccessfullyChanged ?
          <OperationResult status={'success'} title={'Avatar zmieniony 👍'} description={'Pomyślnie zmieniono zdjęcie użytkownika.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/uzytkownicy/${props.user.id}`}/>
        :
        pageState === EditUserDataPageStatus.LinkToEmailChangeSuccessfullySent ?
          <OperationResult status={'success'} title={'Wysłano email na nowy adres 👍'} description={'Wysłano link potwierdzający zmianę adresu email na adres wskazany w formularzu. Powinien się on pojawić w ciągu kilku minut. Pamiętaj o sprawdzeniu zakładki SPAM. Link jest aktywny 24 godziny.'} showButton={false}/>
        :
        pageState === EditUserDataPageStatus.ChangeEmailForm ?
        <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Zmień adres email
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={changeEmail}>
                <p className="text-black dark:text-white pb-6">Na wpisany poniżej nowy adres email zostanie wysłany nowy link aktywacyjny do konta <span className="font-bold">{props.user.name} {props.user.surname}</span>. Po kliknięciu w niego zmiana adresu email zostanie zatwierdzona. Link wygaśnie automatycznie po 24 godzinach.</p>

                <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="newEmail"
                      >
                        Aktualny adres email
                      </label>
                      
                      <div className="w-full">
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary disabled:cursor-not-allowed"
                            type="email"
                            value={email}
                            disabled
                          />
                        </div>
                      </div>
                </div>

                <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="newEmail"
                        >
                          Nowy adres email
                        </label>
                        
                        <div className="w-full">
                          <div className="relative">
                            <span className="absolute left-4.5 top-4">
                              <svg
                                className="fill-current"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g opacity="0.8">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                    fill=""
                                  />
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                    fill=""
                                  />
                                </g>
                              </svg>
                            </span>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary disabled:cursor-not-allowed"
                              type="email"
                              name="newEmail"
                              id="newEmail"
                              placeholder="Wprowadź nowy adres email"
                              value={newEmail}
                              onChange={(e)=>setNewEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                  </div>

                  <div className="flex justify-between gap-4.5 text-xs sm:text-base">
                    <button
                      className="flex justify-center items-center rounded bg-danger py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type='button'
                      onClick={()=> setPageState(EditUserDataPageStatus.FillingTheForm)}
                    >
                      Powrót
                    </button>
                    <button
                      className="flex justify-center items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                      type='button'
                      onClick={() => setShowWarningChangeEmailModal(true)}
                    >
                      Zmień adres email
                    </button>
                  </div>
                    
              </form>
            </div>
          </div>
        </div>
        </div>
        :
        pageState === EditUserDataPageStatus.ErrorWithSendingForm ?
          <OperationResult status={'error'} title={'Wystąpił błąd 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditUserDataPageStatus.FillingTheForm)}/>
        :
        pageState === EditUserDataPageStatus.FailOnSendingForm ?
          <OperationResult status={'warning'} title={'Wystąpiły błędy 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditUserDataPageStatus.FillingTheForm)}/>
        :
        ''
        }
        </>
        :
        <div>
          <OperationResult status="error" title="Brak uprawnień!" description="Nie możesz edytować danych dotyczących innych użytkowników nie będąc administratorem." showButton={false}/>
        </div>
        }
      </div>


    </>
  );
};

export default UserSettingsForm;
