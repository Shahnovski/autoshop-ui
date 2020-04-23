
export class Car {

  id: number;
  brandId: number;
  ownerId: number;
  carModel: string;
  typeTransmission: TypeTransmission;
  typeEngine: TypeEngine;
  mileageCar: number;
  carStatus: string;
  carCost: number;
  countryLocation: string;
  cityLocation: string;
  carImage: Blob;

}

export enum TypeTransmission {
  AUTOMATIC = 'Automatic',
  MANUAL = 'Manual'
}

export enum TypeEngine {
  GASOLINE = 'Gasoline',
  ELECTRIC = 'Electric'
}

