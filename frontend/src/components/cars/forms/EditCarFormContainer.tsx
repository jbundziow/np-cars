import { db_Car } from "../../../types/db_types";
import OperationResult from "../../general/OperationResult";
import { EditFormPageStatus } from "../../../types/enums";
import { warnings } from "../../../types/common";
import { useState } from "react";
import DOMAIN_NAME from "../../../utilities/domainName";
import ModalWarning from "../../general/ModalWarning";
import CarRowInFormImg from "../../general/CarRowInFormImg";
import formatDate from "../../../utilities/formatDate";
import StyledSpan from "../../general/spanElements/StyledSpan";



interface EditCarFormContainerProps {
    carData: db_Car;
}

const EditCarFormContainer = (props: EditCarFormContainerProps) => {




  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])


  const [pageState, setPageState] = useState<EditFormPageStatus>(EditFormPageStatus.FillingTheForm)



  const [brand, setBrand] = useState<string>(props.carData.brand);
  const [model, setModel] = useState<string>(props.carData.model);
  const [type, setType] = useState<string>(props.carData.type);
  const [image, setImage] = useState<File | null>(null);
  const [plateNumber, setPlateNumber] = useState<string>(props.carData.plateNumber);
  const [hasFuelCard, setHasFuelCard] = useState<boolean>(props.carData.hasFuelCard);
  const [fuelCardPIN, setFuelCardPIN] = useState<number | ''>(props.carData.fuelCardPIN ? Number(props.carData.fuelCardPIN) : '');
  const [fuelType, setFuelType] = useState<string>(props.carData.fuelType);
  const [tankCapacity, setTankCapacity] = useState<number | ''>(props.carData.tankCapacity);
  const [loadCapacity, setLoadCapacity] = useState<number | ''>(props.carData.loadCapacity);
  const [nextInspectionDate, setNextInspectionDate] = useState<string | ''>(formatDate(new Date(props.carData.nextInspectionDate)));
  const [nextInsuranceDate, setNextInsuranceDate] = useState<string | ''>(formatDate(new Date(props.carData.nextInsuranceDate)));
  const [availabilityStatus, setAvailabilityStatus] = useState<string>(props.carData.availabilityStatus);
  const [availabilityDescription, setAvailabilityDescription] = useState<string>(props.carData.availabilityDescription ? props.carData.availabilityDescription : '');






  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState<boolean>(false);
  const [showWarningEditModal, setShowWarningEditModal] = useState<boolean>(false);
  
  
  
  


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
    const selectedImage = event.target.files[0]; // Get the selected file
    setImage(selectedImage); // Store the selected file in the component's state
    }
};
  

  
  
  


  const editCar = async () => {

    const finalFuelCardPIN = hasFuelCard ? fuelCardPIN : '';

    const formData = new FormData();
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('type', type);
    if (image) {formData.append('image', image)}
    formData.append('plateNumber', plateNumber);
    formData.append('hasFuelCard', hasFuelCard.toString());
    formData.append('fuelCardPIN', finalFuelCardPIN.toString());
    formData.append('fuelType', fuelType);
    formData.append('tankCapacity', tankCapacity.toString());
    formData.append('loadCapacity', loadCapacity.toString());
    formData.append('nextInspectionDate', nextInspectionDate);
    formData.append('nextInsuranceDate', nextInsuranceDate);
    formData.append('availabilityStatus', availabilityStatus);
    formData.append('availabilityDescription', availabilityDescription);

    try {
      const response = await fetch(`${DOMAIN_NAME}/admin/cars/${props.carData.id}`, {
        method: 'PUT',
        // headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        credentials: 'include',
        body: formData,
      });
      if (response.ok) {
        setPageState(EditFormPageStatus.DataSuccessfullyEdited);

      } else {
        const responseJSON = await response.json();
        if(responseJSON.status === 'fail') {
          setPageState(EditFormPageStatus.FailOnSendingForm);
          setWarnings(responseJSON.data);
        }
        else {
        setPageState(EditFormPageStatus.ErrorWithSendingForm);
        }
      }
    }
    catch (error) {
      setPageState(EditFormPageStatus.ErrorWithSendingForm);
    }
    
  };




  
  const deleteCar = async () => {
    try {
          const response = await fetch(`${DOMAIN_NAME}/admin/cars/${props.carData.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
          });
    
          if (response.ok) {
            setPageState(EditFormPageStatus.DataSuccessfullyDeleted);
    
          } else {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
              setPageState(EditFormPageStatus.FailOnSendingForm);
              setWarnings(responseJSON.data);
            }
            else {
            setPageState(EditFormPageStatus.ErrorWithSendingForm);
            }
          }
        }
        catch (error) {
          setPageState(EditFormPageStatus.ErrorWithSendingForm);
        }
  }






    return (
        <>
        <ModalWarning showModal={showWarningDeleteModal} setShowModal={(state: boolean) => setShowWarningDeleteModal(state)} title= {'Usuń samochód'} bodyText={`Czy na pewno chcesz usunąć ten samochód z bazy danych? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, usuń'} callback={ async () => await deleteCar() }/>
        <ModalWarning showModal={showWarningEditModal} setShowModal={(state: boolean) => setShowWarningEditModal(state)} title= {'Zatwierdź zmiany'} bodyText={`Czy na pewno chcesz zatwierdzić wprowadzone zmiany dla tego samochodu? Nie można później cofnąć tej operacji.`} cancelBtnText={'Anuluj'} acceptBtnText={'Tak, zatwierdzam'} callback={ async () => await editCar() }/>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">
  
            <CarRowInFormImg carData={props.carData} />

          
            <div className='col-span-3'>
              
            
              <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white">
                  {pageState === EditFormPageStatus.FillingTheForm ?
                  <form className="m-0 lg:m-5">

 

                    <div className='flex justify-end'>
                      <p>ID: {props.carData.id}</p>
                    </div>


                    {props.carData.availabilityStatus === 'rented' ?
                    <OperationResult status="warning" title="Edytowanie zabronione." warnings={[{en: `You cannot edit a car with the status "Rented".`, pl: `Nie możesz edytować samochodu o statusie "Wypożyczony".`}]} showButton={false}/>
                    :
                    <div>



                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Marka
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Toyota`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />
                    </div>








                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Model
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Avensis`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                    />
                    </div>









                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Typ samochodu
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path fill="#3C50E0" d="M32 96c0-35.3 28.7-64 64-64H320c23.7 0 44.4 12.9 55.4 32h51.8c25.3 0 48.2 14.9 58.5 38l52.8 118.8c.5 1.1 .9 2.1 1.3 3.2H544c35.3 0 64 28.7 64 64v32c17.7 0 32 14.3 32 32s-14.3 32-32 32H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V288c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32V96zM384 224h85.9l-42.7-96H384v96zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm368-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            >
                                <option value="passengerCar">Samochód osobowy</option>
                                <option value="bus">Bus</option>
                                <option value="truck">Samochód ciężarowy</option>
                            </select>
                        </div>
                    </div>











                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Zdjęcie samochodu (max. 10MB, format: .jpg, .jpeg, .png lub .webp, zalecane proporcje 16:9)
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png, .webp"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={handleImageChange}
                    />
                    {image && (
                    <div className="flex justify-center items-center p-10">
                        <img className="md:max-w-[80%] rounded-lg" src={URL.createObjectURL(image)} alt="Wybrany obraz" />
                    </div>
                    )}
                    {image === null && props.carData.imgPath && (
                    <div className="flex justify-center items-center p-10">
                        <img className="md:max-w-[80%] rounded-lg" src={`${DOMAIN_NAME}${props.carData.imgPath}`} alt="Wybrany obraz" />
                    </div>
                    )}
                    </div>










                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Numer rejestracyjny samochodu
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. FNW22938`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={plateNumber}
                        onChange={e => setPlateNumber(e.target.value)}
                    />
                    </div>









                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Czy auto posiada kartę paliwową?
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={hasFuelCard ? 'true' : 'false'}
                            onChange={(e)=>setHasFuelCard(e.target.value === 'true')}
                            >
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </div>
                    </div>












                    {hasFuelCard === true ?
                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Pin do karty paliwowej:
                    </label>
                    <input
                        type="number"
                        placeholder={`np. 4821`}
                        step={1}
                        max={999999}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={fuelCardPIN}
                        onChange={e => setFuelCardPIN(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && fuelCardPIN === 0) {
                            setFuelCardPIN('');
                            }
                        }}
                    />
                    </div>
                    :
                    null
                    }














                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Typ paliwa
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="#3C50E0" d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={fuelType}
                            onChange={(e)=>setFuelType(e.target.value)}
                            >
                                <option value="diesel">Diesel</option>
                                <option value="petrol">Benzyna</option>
                            </select>
                        </div>
                    </div>













                    <div className='mb-5'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pojemność zbiornika paliwa (w litrach)
                    </label>
                    <input
                        required
                        type="number"
                        step="1"
                        min="10"
                        max="1600"
                        placeholder={`Posłuży ona do obliczenia pozostałej ilości paliwa w baku. Jednostka to litr.`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={tankCapacity}
                        onChange={e => setTankCapacity(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && tankCapacity === 0) {
                            setTankCapacity('');
                            }
                        }}
                    />
                    </div>












                    <div className='mb-5'>
                    <label className="mb-3 block text-black dark:text-white">
                        Maksymalna dopuszczalna ładowność (w kilogramach)
                    </label>
                    <input
                        required
                        type="number"
                        step="1"
                        min="100"
                        max="40000"
                        placeholder={`Obliczysz ją z dowodu rejestracyjnego pojazdu. Wzór to F.1 - G.`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={loadCapacity}
                        onChange={e => setLoadCapacity(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && loadCapacity === 0) {
                            setLoadCapacity('');
                            }
                        }}
                    />
                    </div>














                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data następnego przeglądu technicznego:
                      </label>
                      <input
                        required
                        type="date"
                        value={nextInspectionDate}
                        onChange={(e)=>setNextInspectionDate(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

















                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data końca ubezpieczenia OC lub AC:
                      </label>
                      <input
                        required
                        type="date"
                        value={nextInsuranceDate}
                        onChange={(e)=>setNextInsuranceDate(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>














                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Status dostępności
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="#3C50E0" d="M350 177.5c3.8-8.8 2-19-4.6-26l-136-144C204.9 2.7 198.6 0 192 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26s12.5 14.5 22 14.5h88l0 192c0 17.7-14.3 32-32 32H32c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32l80 0c70.7 0 128-57.3 128-128l0-192h88c9.6 0 18.2-5.7 22-14.5z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={availabilityStatus}
                            onChange={(e)=>setAvailabilityStatus(e.target.value)}
                            >
                                <option value="available">Dostępny</option>
                                <option value="notAvailable">Niedostępny</option>
                                <option value="onService">W serwisie</option>
                                <option value="damaged">Uszkodzony</option>
                                <option value="banned">Zbanowany</option>
                            </select>
                        </div>
                    </div>














                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Komentarz dotyczący dostępności (opcjonalny):
                    </label>
                    <input
                        type="text"
                        placeholder={`np. "Auto czeka na dostawę zimowych opon"`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={availabilityDescription}
                        onChange={e => setAvailabilityDescription(e.target.value)}
                    />
                    </div>









                    <div className="flex flex-col">
                      <p className="pt-5 pb-3">Objaśnienia statusów samochodów:</p>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <StyledSpan color={'success'} text={'\xa0' + '\xa0' + '\xa0' + 'Dostępny' + '\xa0' + '\xa0' + '\xa0'}/>
                        <p className="pl-4">Samochód może być swobodnie używany przez wszystkich użytkowników aplikacji.</p>
                      </div>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <StyledSpan color={'warning'} text={'Wypożyczony'}/>
                        <p className="pl-4">Samochód jest aktualnie wypożyczony przez dowolnego użytkownika aplikacji. W razie potrzeby inny użytkownik może dokonać za niego zwrotu. Samochodu o tym statusie nie można edytować.</p>
                      </div>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <StyledSpan color={'danger'} text={'\xa0' + '\xa0' + 'Niedostępny' + '\xa0' + '\xa0'}/>
                        <p className="pl-4">Samochód nie może być wypożyczany przez innych użytkowników, ale nadal jest widoczny.</p>
                      </div>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <p className="whitespace-nowrap"><StyledSpan color={'danger'} text={'\xa0' + '\xa0' + '\xa0' + `W serwisie` + '\xa0' + '\xa0' + '\xa0'}/></p>
                        <p className="pl-4">Samochód nie może być wypożyczany przez innych użytkowników, ale nadal jest widoczny.</p>
                      </div>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <StyledSpan color={'danger'} text={'\xa0' + '\xa0' + 'Uszkodzony' + '\xa0' + '\xa0'}/>
                        <p className="pl-4">Samochód nie może być wypożyczany przez innych użytkowników, ale nadal jest widoczny.</p>
                      </div>

                      <div className="flex items-center pb-3 text-xs md:text-base">
                        <StyledSpan color={'danger'} text={'\xa0' + '\xa0' + 'Zbanowany' + '\xa0' + '\xa0'}/>
                        <p className="pl-4">Samochód jest całkowicie niewidoczny dla innych użytkowników (poza administratorami) i nie można go wypożyczać / rezerwować / tankować / zgłaszać usterek itd.</p>
                      </div>


                    </div>










                    

                    <div className='flex flex-col md:flex-row justify-center items-center mt-10 mb-4 mx-2 gap-5'>
                      <button className="flex w-full sm:w-10/12 md:w-3/4 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningEditModal(true)}}>
                        Zatwierdź zmiany
                      </button>

                      <p>lub...</p>

                      <button className="flex w-full sm:w-1/2 md:w-1/4 justify-center rounded bg-danger p-3 font-medium text-gray hover:opacity-90" type='button' onClick={() => {setShowWarningDeleteModal(true)}}>
                        Usuń ten samochód CAŁKOWICIE
                      </button>
                    </div>





                  </div>
                }


                  </form>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyEdited ?
                    <OperationResult status={'success'} title={'Dokonano edycji danych dotyczących samochodu 👍'} description={'Dane zostały pomyślnie zapisane w bazie danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/samochody/${props.carData.id}`}/>
                  :
                  pageState === EditFormPageStatus.DataSuccessfullyDeleted ?
                    <OperationResult status={'success'} title={'Samochód usunięty 👍'} description={'Dane zostały pomyślnie usunięte z bazy danych.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/samochody/zestawienie`}/>
                  :
                  pageState === EditFormPageStatus.ErrorWithSendingForm ?
                  <OperationResult status={'error'} title={'Wystąpił błąd podczas edytowania samochodu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  pageState === EditFormPageStatus.FailOnSendingForm ?
                  <OperationResult status={'warning'} title={'Wystąpiły błędy podczas edytowania samochodu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(EditFormPageStatus.FillingTheForm)}/>
                  :
                  ''
                  }
              </div>
              
            </div>
         
        </div>
        
        </>
    );
  };
  
  export default EditCarFormContainer;

