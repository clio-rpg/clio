import { registerEnumType } from '@nestjs/graphql';

export enum SystemDetails {
  DungeonsAndDragons = 'DungeonsAndDragons',
  Custom = 'Custom',
}

registerEnumType(SystemDetails, {
  name: 'SystemDetails',
});
