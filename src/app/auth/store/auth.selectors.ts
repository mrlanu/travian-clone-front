import {createSelector} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as fromAuth from "./auth.reducer";

export const userSelector = createSelector(
  (state: fromApp.AppState) => state.auth,
  (st: fromAuth.State) => st.user
);
