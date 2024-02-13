import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CoverOne from '../../images/cover/spawacz-cover.jpg';
import UserMale from '../../images/user/unknownUserMale.jpg';
import UserFemale from '../../images/user/unknownUserFemale.jpg';
import DOMAIN_NAME from '../../utilities/domainName';
import { useParams } from 'react-router-dom';
import fetchData from '../../utilities/fetchData';
import Loader from '../../common/Loader';
import OperationResult from '../../components/general/OperationResult';
import BarChart from '../../components/general/charts/BarChart';
import useAuth from '../../hooks/useAuth';

interface Props {
  documentTitle: string;
}

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const UserPage = (props: Props) => {
  useEffect(() => {document.title = `${props.documentTitle}`}, []);

  const params = useParams();

  useEffect(() => {document.title = `${props.documentTitle}`}, []);

  const [data1, setData1] = useState<ApiResponse>();  //user data

  const [failData, setFailData] = useState<ApiResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isFail, setFail] = useState<boolean>(false)
  const [isError, setError] = useState<boolean>(false);
  
  useEffect(() => {
    const getData = async () => {   

    const res1 = await fetchData(`${DOMAIN_NAME}/users/${params.userid}`, (arg:ApiResponse)=>{setFailData(arg)}, (arg:boolean)=>{setFail(arg)}, (arg:boolean)=>{setError(arg)})
    setData1(res1);

    if(!res1.data) {
      setError(true)
    }

    setLoading(false)
    }
    getData()
  }, [])


  
  //TODO: DELETE IT LATER .....
  const [kilometers, setKilometers] = useState(generateRandomNumbers());
  const [chartKey, setChartKey] = useState(0);


  function generateRandomNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 0; i < 12; i++) {
      const randomNumber = Math.floor(Math.random() * (300 - 100 + 1) + 100);
      numbers.push(randomNumber);
    }
    return numbers;
  }

  //TODO: DELETE IT LATER ^^^^

  const { auth } = useAuth();

  return (
    <>
      <Breadcrumb pageName="Profil użytkownika" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {loading === true ? <Loader/> : (!isFail && !isError) ?
      <div>
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />

        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img className="bg-cover bg-top-center rounded-[50%]" src={(!isFail && !isError) ? data1?.data.avatarPath !== null ? `${DOMAIN_NAME}${data1?.data.avatarPath}` : data1?.data.gender === 'female' ? UserFemale : UserMale : UserMale} alt="User Avatar"/>

              {Number(auth.userID) === data1?.data.id || auth.userRole === 'admin' ?
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
              :
              <></>
              }

            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {`${data1?.data.name} ${data1?.data.surname}`}
            </h3>
            <p className="font-medium">{data1?.data.employedAs}</p>

            
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-[90%] grid-cols-2 xl:grid-cols-4 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                #999#
                </span>
                <span className="text-sm">Wypożyczeń samochodów</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                #999#
                </span>
                <span className="text-sm">Złożonych rezerwacji</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                #999#
                </span>
                <span className="text-sm">Zgłoszonych usterek</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row py-5">
                <span className="font-semibold text-black dark:text-white">
                  #999#
                </span>
                <span className="text-sm">Tankowań samochodów</span>
              </div>
            </div>

          <div className="md:my-10 md:mx-10">
          <BarChart key={chartKey} title={'Przejechane kilometry'} data={kilometers} categories={['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']} filterBy={'year'} setFilter={async (value: number) => {await setKilometers(generateRandomNumbers()); await setChartKey(Math.random()); console.log(kilometers)}}/>
          </div>

          </div>
        </div>
      </div>
      :
      (isFail && !isError) ? <OperationResult status="warning" title="Wystąpiły błędy podczas ładowania zawartości." warnings={failData?.data} showButton={false}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>
      }
      </div>
    </>
  );
};

export default UserPage;
