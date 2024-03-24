
import { Link } from "react-router-dom";
import CardStat from "../general/CardStat.tsx";
import { HomepageStats } from "../../types/api.ts";
import { nbp_API_response } from "../../types/nbp_api.ts";

  interface HomepageComponentProps {
    homepageData: HomepageStats;
    usdRates: nbp_API_response | null | undefined;
    euroRates: nbp_API_response | null | undefined;
  }



const HomepageComponent = (props: HomepageComponentProps) => {




    return (
        <>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white mt-3 mb-3">Cześć {props.homepageData.current_user.name},</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mx-2">
                
                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                }
                value={`${props.homepageData.total_distance_currentYear} km`}
                value_wrap={true}
                title={`Tyle kilometrów przejechali wszyscy użytkownicy aplikacji w 2024 roku`}
                showProgress={false}
                otherBackgroundColor={true}
                />


                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 384 512"><path d="M144 56c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v72H144V56zm176 72H288V56c0-30.9-25.1-56-56-56H152C121.1 0 96 25.1 96 56v72H64c-35.3 0-64 28.7-64 64V416c0 35.3 28.7 64 64 64c0 17.7 14.3 32 32 32s32-14.3 32-32H256c0 17.7 14.3 32 32 32s32-14.3 32-32c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64zM112 224H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 128H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                }
                value={props.homepageData.total_rentals_currentYear}
                value_wrap={false}
                title={`Na ten dystans składa się taka liczba podróży`}
                showProgress={false}
                otherBackgroundColor={true}
                />

                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M176 8c-6.6 0-12.4 4-14.9 10.1l-29.4 74L55.6 68.9c-6.3-1.9-13.1 .2-17.2 5.3s-4.6 12.2-1.4 17.9l39.5 69.1L10.9 206.4c-5.4 3.7-8 10.3-6.5 16.7s6.7 11.2 13.1 12.2l78.7 12.2L90.6 327c-.5 6.5 3.1 12.7 9 15.5s12.9 1.8 17.8-2.6l35.3-32.5 9.5-35.4 10.4-38.6c8-29.9 30.5-52.1 57.9-60.9l41-59.2c11.3-16.3 26.4-28.9 43.5-37.2c-.4-.6-.8-1.2-1.3-1.8c-4.1-5.1-10.9-7.2-17.2-5.3L220.3 92.1l-29.4-74C188.4 12 182.6 8 176 8zM367.7 161.5l135.6 36.3c6.5 1.8 11.3 7.4 11.8 14.2l4.6 56.5-201.5-54 32.2-46.6c3.8-5.6 10.8-8.1 17.3-6.4zm-69.9-30l-47.9 69.3c-21.6 3-40.3 18.6-46.3 41l-10.4 38.6-16.6 61.8-8.3 30.9c-4.6 17.1 5.6 34.6 22.6 39.2l15.5 4.1c17.1 4.6 34.6-5.6 39.2-22.6l8.3-30.9 247.3 66.3-8.3 30.9c-4.6 17.1 5.6 34.6 22.6 39.2l15.5 4.1c17.1 4.6 34.6-5.6 39.2-22.6l8.3-30.9L595 388l10.4-38.6c6-22.4-2.5-45.2-19.6-58.7l-6.8-84c-2.7-33.7-26.4-62-59-70.8L384.2 99.7c-32.7-8.8-67.3 4-86.5 31.8zm-17 131a24 24 0 1 1 -12.4 46.4 24 24 0 1 1 12.4-46.4zm217.9 83.2A24 24 0 1 1 545 358.1a24 24 0 1 1 -46.4-12.4z"/></svg>
                }
                value={props.homepageData.faults_to_be_repaired}
                value_wrap={false}
                title={`Usterek oczekuje aktualnie na naprawę`}
                showProgress={false}
                otherBackgroundColor={true}
                />

                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
                }
                value={props.homepageData.active_users}
                value_wrap={false}
                title={`Aplikacja ma tylu aktywnych użytkowników`}
                showProgress={false}
                otherBackgroundColor={true}
                />


                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M165.4 96H346.6c13.6 0 25.7 8.6 30.2 21.4L402.9 192H109.1l26.1-74.6c4.5-12.8 16.6-21.4 30.2-21.4zm-90.6 .3L39.6 196.8C16.4 206.4 0 229.3 0 256v80c0 23.7 12.9 44.4 32 55.4V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V400H384v48c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V391.4c19.1-11.1 32-31.7 32-55.4V256c0-26.7-16.4-49.6-39.6-59.2L437.2 96.3C423.7 57.8 387.4 32 346.6 32H165.4c-40.8 0-77.1 25.8-90.6 64.3zM208 272h96c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V288c0-8.8 7.2-16 16-16zM48 280c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H72c-13.3 0-24-10.7-24-24zm360-24h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H408c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                }
                value={props.homepageData.all_cars}
                value_wrap={false}
                title={`Tyle samochodów jest aktualnie w firmie`}
                showProgress={false}
                otherBackgroundColor={true}
                />



                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 512 512"><path d="M280 24c0-13.3-10.7-24-24-24s-24 10.7-24 24v80c0 13.3 10.7 24 24 24s24-10.7 24-24V24zM185.8 224H326.2c6.8 0 12.8 4.3 15.1 10.6L360.3 288H151.7l19.1-53.4c2.3-6.4 8.3-10.6 15.1-10.6zm-75.3-10.9L82.2 292.4C62.1 300.9 48 320.8 48 344v40 64 32c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V448H384v32c0 17.7 14.3 32 32 32h16c17.7 0 32-14.3 32-32V448 384 344c0-23.2-14.1-43.1-34.2-51.6l-28.3-79.3C390.1 181.3 360 160 326.2 160H185.8c-33.8 0-64 21.3-75.3 53.1zM128 344a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm232 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM39 39c-9.4 9.4-9.4 24.6 0 33.9l48 48c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L73 39c-9.4-9.4-24.6-9.4-33.9 0zm400 0L391 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l48-48c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0z"/></svg>
                }
                value={props.homepageData.all_available_cars}
                value_wrap={false}
                title={`Taka ilość samochodów jest aktualnie do Twojej dyspozycji`}
                showProgress={false}
                otherBackgroundColor={true}
                />

                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 320 512"><path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z"/></svg>
                }
                value={props.usdRates?.rates[0].ask ? `${props.usdRates?.rates[0].ask} zł` : 'Brak danych'}
                value_wrap={false}
                title={`Za taką kwotę kupisz dzisiaj 1 dolara`}
                showProgress={false}
                otherBackgroundColor={true}
                />


                <CardStat
                svg={
                <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="16" fill="none" viewBox="0 0 320 512"><path d="M48.1 240c-.1 2.7-.1 5.3-.1 8v16c0 2.7 0 5.3 .1 8H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H60.3C89.9 419.9 170 480 264 480h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264c-57.9 0-108.2-32.4-133.9-80H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H112.2c-.1-2.6-.2-5.3-.2-8V248c0-2.7 .1-5.4 .2-8H256c17.7 0 32-14.3 32-32s-14.3-32-32-32H130.1c25.7-47.6 76-80 133.9-80h24c17.7 0 32-14.3 32-32s-14.3-32-32-32H264C170 32 89.9 92.1 60.3 176H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H48.1z"/></svg>
                }
                value={props.euroRates?.rates[0].ask ? `${props.euroRates?.rates[0].ask} zł` : 'Brak danych'}
                value_wrap={false}
                title={`Za taką kwotę kupisz dzisiaj 1 euro`}
                showProgress={false}
                otherBackgroundColor={true}
                />
        

        </div>









        <h2 className="text-title-md font-semibold text-black dark:text-white mt-10 mb-2">Panel szybkiego dostępu:</h2>
        <div className="bg-white dark:bg-boxdark rounded-lg px-6 py-10 mx-2">

        <div className="flex flex-row flex-wrap justify-around gap-2">
            <div className="flex justify-center my-4">
                <Link
                to={`/wypozyczenia/wypozycz-samochod`}
                className="min-w-[220px] text-center rounded-lg bg-primary py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Wypożycz samochód
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/rezerwacje/dokonaj-rezerwacji`}
                className="min-w-[220px] text-center rounded-lg bg-primary py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Dokonaj rezerwacji
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/tankowania/zglos-tankowanie`}
                className="min-w-[220px] text-center rounded-lg bg-primary py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Zgłoś tankowanie
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/usterki/zglos`}
                className="min-w-[220px] text-center rounded-lg bg-primary py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Zgłoś usterkę
                </Link>
            </div>
        </div>
        <div className="flex flex-row flex-wrap justify-around gap-2">

            <div className="flex justify-center my-4">
                <Link
                to={`/tankowania/karty-paliwowe`}
                className="min-w-[220px] text-center text-white rounded-lg bg-meta-3 py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Kody PIN kart flotowych
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/wypozyczenia/biezace-wypozyczenia`}
                className="min-w-[220px] text-center text-white rounded-lg bg-meta-3 py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Aktualne wypożyczenia
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/rezerwacje`}
                className="min-w-[220px] text-center text-white rounded-lg bg-meta-3 py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Aktualne rezerwacje
                </Link>
            </div>
            <div className="flex justify-center my-4">
                <Link
                to={`/usterki/status-napraw`}
                className="min-w-[220px] text-center text-white rounded-lg bg-meta-3 py-4 px-6 font-medium text-gray hover:bg-opacity-70"
                >
                Zestawienie usterek
                </Link>
            </div>
        </div>


        </div>
    
         
        </>
      );
  };
  
export default HomepageComponent





