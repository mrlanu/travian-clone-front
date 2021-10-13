export interface Warehouse {
  goods: Map<string, number>;
}

export interface TaskModel {
  taskId: string;
  villageId: string;
  position: number;
  level: number;
  timeLeft: number;
}

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

export interface VillageDto {
  villageId: string;
  accountId: string;
  x: number;
  y: number;
  culture: number;
  population: number;
  villageType: string;
  warehouse: Warehouse;
  fields: Field[];
  tasks: TaskModel[];
}

export interface BuildingBase {

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
  storage: Map<EResource, number>;
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
  timeLeft: string;
  seconds: number
}

export enum EResource {
  WOOD, CLAY, IRON, CROP
}

export enum EUnits {
  LEGIONNAIRE, PRAETORIAN
}
