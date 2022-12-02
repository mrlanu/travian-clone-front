import { createAction, props } from '@ngrx/store';
import {User} from "../user.model";

export const login = createAction(
  '[Login Page] Login',
  props<{ user: User }>());
