import {FieldView} from './village-dto.model';

export interface FieldUpgradeRequest {
  villageId: string;
  field: FieldView;
}
