
export type db_Car_basic = {
    id: number,
    brand: string,
    model: string,
    imgPath: string,
    availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
}



export type db_Car = {
    id: number,
    brand: string,
    model: string,
    type: 'passengerCar' | 'bus' | 'truck',
    imgPath: string,
    plateNumber: string,
    hasFuelCard: boolean,
    fuelCardPIN: string | null,
    fuelType: 'diesel' | 'petrol',
    tankCapacity: number, //liters
    loadCapacity: number, //kilograms
    nextInspectionDate: Date,
    nextInsuranceDate: Date,
    availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged' | 'banned',
    availabilityDescription: string | null,
    
    createdAt: Date,
    updatedAt: Date,
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
    lastEditedByModeratorOfID: number | null,
    carMileage: number,
    numberOfLiters: number,
    costBrutto: number | null,
    isFuelCardUsed: boolean,
    isAcknowledgedByModerator: boolean | null,
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Faults = {
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



export type db_Places = {
    id: number,
    projectCode: string,
    placeName: string,
    projectName: string,
    status: 'active' | 'banned',
    
    createdAt: Date,
    updatedAt: Date,
}



export type db_Users = {
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