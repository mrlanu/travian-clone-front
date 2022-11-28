import {createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {User} from "../user.model";

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => (
    { ...state, user }
  )),
);
