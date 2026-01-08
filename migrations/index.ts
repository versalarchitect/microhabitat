import * as migration_20260108_143528_add_city_image from './20260108_143528_add_city_image';

export const migrations = [
  {
    up: migration_20260108_143528_add_city_image.up,
    down: migration_20260108_143528_add_city_image.down,
    name: '20260108_143528_add_city_image'
  },
];
