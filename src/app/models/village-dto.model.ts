export interface Field {
  position: number;
  level: number;
  fieldType: string;
  productivity: number;
  underUpgrade: boolean;
  timeUpgradeComplete: Date;
  ableToUpgrade: boolean;
  timeToNextLevel: number;
  resourcesToNextLevel: Map<string, number>;
}

export class VillageView {
  villageId: string;
  accountId: string;
  name: string;
  x: number;
  y: number;
  villageType: string;
  population: number;
  culture: number;
  fields: FieldView[];
  buildings: string;
  storage: Map<string, number>;
  warehouseCapacity: number;
  granaryCapacity: number;
  homeLegion: Map<EUnits, number>;
  producePerHour: Map<string, number>;
  eventsList: EventView[];


  constructor(villageId: string, accountId: string, name: string, x: number, y: number,
              villageType: string, population: number, culture: number, fields: FieldView[],
              buildings: string, storage: Map<string, number>, warehouseCapacity: number,
              granaryCapacity: number, homeLegion: Map<EUnits, number>, producePerHour: Map<string, number>,
              eventsList: EventView[]) {
    this.villageId = villageId;
    this.accountId = accountId;
    this.name = name;
    this.x = x;
    this.y = y;
    this.villageType = villageType;
    this.population = population;
    this.culture = culture;
    this.fields = fields;
    this.buildings = buildings;
    this.storage = storage;
    this.warehouseCapacity = warehouseCapacity;
    this.granaryCapacity = granaryCapacity;
    this.homeLegion = homeLegion;
    this.producePerHour = producePerHour;
    this.eventsList = eventsList;
  }
}

export interface FieldView {
  position: number;
  level: number;
  name: string;
  production: number;
  underUpgrade: boolean;
  ableToUpgrade: boolean;
  description: string;
  timeToNextLevel: number;
  resourcesToNextLevel: Map<string, number>;
}

export interface EventView {
  id: string;
  name: string;
  toLevel: number;
  completeTime: Date;
  timeLeft: number;
}

export enum EResource {
  WOOD, CLAY, IRON, CROP
}

export enum EUnits {
  LEGIONNAIRE, PRAETORIAN
}
