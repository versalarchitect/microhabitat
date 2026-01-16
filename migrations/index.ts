import * as migration_20260108_143528_add_city_image from './20260108_143528_add_city_image';
import * as migration_20260115_133310_add_city_details from './20260115_133310_add_city_details';
import * as migration_20260116_062228_add_showcase_section from './20260116_062228_add_showcase_section';

export const migrations = [
  {
    up: migration_20260108_143528_add_city_image.up,
    down: migration_20260108_143528_add_city_image.down,
    name: '20260108_143528_add_city_image',
  },
  {
    up: migration_20260115_133310_add_city_details.up,
    down: migration_20260115_133310_add_city_details.down,
    name: '20260115_133310_add_city_details',
  },
  {
    up: migration_20260116_062228_add_showcase_section.up,
    down: migration_20260116_062228_add_showcase_section.down,
    name: '20260116_062228_add_showcase_section'
  },
];
