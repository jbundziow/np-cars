
export interface db_Car_basic {
    id: number;
    brand: string;
    model: string;
    imgPath: string;
    availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned';
}


export interface db_Car extends db_Car_basic {
    type: 'passengerCar' | 'bus' | 'truck';
    plateNumber: string;
    hasFuelCard: boolean;
    fuelCardPIN: string | null;
    fuelType: 'diesel' | 'petrol';
    tankCapacity: number; //liters
    loadCapacity: number; //kilograms
    nextInspectionDate: Date;
    nextInsuranceDate: Date;
    availabilityDescription: string | null;
    createdAt: Date;
    updatedAt: Date;
}



export type db_Rental = {
    id: number,
    carID: number,
    userID: number,
    returnUserID: number | null,
    lastEditedByModeratorOfID: number | null,
    carMileageBefore: number,
    carMileageAfter: number | null,
    distance: number | null,
    travelDestination: string | null,
    placeID: number | null,
    dateFrom: Date,
    dateTo: Date | null,
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Reservation = {
    id: number,
    carID: number,
    userID: number,
    lastEditedByModeratorOfID: number | null,
    dateFrom: Date,
    dateTo: Date,
    travelDestination: string
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Refueling = {
    id: number,
    carID: number,
    userID: number,
    refuelingDate: Date,
    lastEditedByModeratorOfID: number | null,
    carMileage: number,
    numberOfLiters: number,
    averageConsumption: number | null,
    costBrutto: number,
    costPerLiter: number | null,
    isFuelCardUsed: boolean,
    moneyReturned: boolean | null,
    invoiceNumber: string | null,
    isAcknowledgedByModerator: number | null,
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Fault = {
    id: number,
    carID: number,
    userID: number,
    moderatorID: number | null,
    lastChangeAt: string | null,
    title: string,
    description: string,  
    status: 'pending' | 'accepted' | 'finished' | 'cancelled',
    resultDescription: string | null,
    repairCost: number | null,
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Place = {
    id: number,
    projectCode: string,
    placeName: string,
    projectName: string,
    status: 'active' | 'closed' | 'banned',
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_User = {
    id: number,
    email: string,
    // password: string,
    gender: 'male' | 'female',
    name: string,
    surname: string,
    employedAs: string,
    avatarPath: string | null,
    role: 'unconfirmed' | 'banned' | 'admin' | 'user',
    
    createdAt: Date,
    updatedAt: Date,
}