import {createSelector} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromSettlement from "./settlement.reducer";

export const settlementSelector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.current
);

export const settlementIdSellector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.current?.villageId
);

export const settlementsListSelector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.allSettlements
);


export const availableBuildingsSelector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.availableBuildings
);
