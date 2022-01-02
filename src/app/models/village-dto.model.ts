export class VillageView {

  constructor(public villageId: string,
              public accountId: string,
              public nation: string,
              public name: string,
              public x: number,
              public y: number,
              public villageType: string,
              public population: number,
              public culture: number,
              public approval: number,
              public buildings: any[],
              public storage: Map<string, number>,
              public warehouseCapacity: number,
              public granaryCapacity: number,
              public homeLegion: Map<string, number>,
              public producePerHour: Map<string, number>,
              public eventsList: EventView[]) {
  }
}

export interface ShortVillageInfo{
  villageId: string;
  name: string;
  x: number;
  y: number;
}

export interface EventView {
  id: string;
  position: number;
  name: string;
  toLevel: number;
  completeTime: Date;
  timeLeft: number;
}

export enum EResource {
  WOOD, CLAY, IRON, CROP
}

export enum EUnits {
  LEGIONNAIRE, PRAETORIAN, PHALANX
}
