import {createSelector} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromSettlement from "./settlement.reducer";
import {VillageView} from "../../models/village-dto.model";

const settlement = (state: fromApp.AppState) => state.settlement;

export const settlementSelector = createSelector(
  settlement,
  (state: fromSettlement.State) => {
    if (state.current) {
      let village = state.current;
      let producePerHour = new Map<string, number>();
      let storage = new Map<string, number>();
      let homeLegion = new Map<string, number>();

      for(const [key, value] of Object.entries(village.producePerHour)){
        producePerHour.set(key, value);
      }
      for(const [key, value] of Object.entries(village.storage)){
        storage.set(key, value);
      }
      for(const [key, value] of Object.entries(village.homeLegion)){
        // PHALANX -> Phalanx
        homeLegion.set(capitalizeFirstLater(key), value);
      }
      return  new VillageView(village.villageId, village.accountId, village.nation, village.name,
        village.x, village.y, village.villageType, village.population, village.culture, village.approval,
        village.buildings, storage, village.warehouseCapacity, village.granaryCapacity, homeLegion,
        village.homeUnits, producePerHour, village.eventsList
      );
    } else {
      return undefined;
    }
  }
);

export const capitalizeFirstLater = (str: string) => {
  let allToLower = str.toLowerCase();
  return allToLower.charAt(0).toUpperCase() + allToLower.slice(1);
}

export const settlementIdSellector = createSelector(
  settlement,
  (state: fromSettlement.State) => state.current?.villageId
);

export const settlementsListSelector = createSelector(
  settlement,
  (state: fromSettlement.State) => state.allSettlements
);

export const availableBuildingsSelector = createSelector(
  settlement,
  (state: fromSettlement.State) => state.availableBuildings
);
