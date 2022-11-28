import {createSelector} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromSettlement from "./settlement.reducer";

export const settlementSelector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.current
);

export const settlementsListSelector = createSelector(
  (state: fromApp.AppState) => state.settlement,
  (st: fromSettlement.State) => st.allSettlements
);
