import * as migration_20260108_143528_add_city_image from './20260108_143528_add_city_image';
import * as migration_20260115_133310_add_city_details from './20260115_133310_add_city_details';

export const migrations = [
  {
    up: migration_20260108_143528_add_city_image.up,
    down: migration_20260108_143528_add_city_image.down,
    name: '20260108_143528_add_city_image',
  },
  {
    up: migration_20260115_133310_add_city_details.up,
    down: migration_20260115_133310_add_city_details.down,
    name: '20260115_133310_add_city_details'
  },
];
