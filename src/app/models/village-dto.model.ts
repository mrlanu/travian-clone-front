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

export interface VillageView {
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
  producePerHour: Map<EResource, number>;
  eventsList: EventView[];
}

export interface FieldView {
  position: number;
  level: number;
  underUpgrade: boolean;
  ableToUpgrade: boolean;
}

export interface EventView {
  name: string;
  completeTime: Date;
  timeLeft: number;
}

export enum EResource {
  WOOD, CLAY, IRON, CROP
}

export enum EUnits {
  LEGIONNAIRE, PRAETORIAN
}
