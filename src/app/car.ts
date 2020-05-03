
export class Car {

  id: number;
  brandId: number;
  brandTitle: string;
  ownerId: number;
  carModel: string;
  typeTransmission: TypeTransmission;
  typeEngine: TypeEngine;
  carMileage: number;
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

