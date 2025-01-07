import type {MapObjectConfig} from './types';

/**
 * Maps an object to a new objects that includes a subset of properties
 * with property renaming capability
 *
 * Example usage:
 *
 * interface InputType {
 *   id: number;
 *   name: string;
 *   age: number;
 * }
 *
 * interface OutputType {
 *   userId: number;
 *   userName: string;
 * }
 *
 * const config: ConfigItem<InputType, OutputType>[] = [
 *   'id', // Direct property mapping
 *   { from: 'name', to: 'userName' }, // Renamed property mapping
 *   { from: 'unknownProp', to: 'missingProp' }, // Invalid property, should log a warning
 *   'unknownField' // Non-existent field, should log a warning
 * ];
 *
 * const output = mapObject(input, config);
 */
export function mapObject<Input extends object, Output extends object>(
  input: Input,
  config: MapObjectConfig<Input, Output>[],
): Output {
  const result = {} as Output;

  config.forEach(item => {
    if (typeof item === 'string') {
      // Direct property mapping
      if (item in input) {
        // @ts-expect-error the type check is not well crafted
        result[item] = input[item];
      } else {
        console.warn(
          `Warning: Property "${item}" does not exist on the input object.`,
        );
      }
    } else if (typeof item === 'object' && 'from' in item && 'to' in item) {
      // Property mapping with renaming
      if (item.from in input) {
        // @ts-expect-error the type check is not well crafted
        result[item.to] = input[item.from];
      } else {
        console.warn(
          `Warning: Property "${String(
            item.from,
          )}" does not exist on the input object.`,
        );
      }
    } else {
      console.warn(`Warning: Invalid config item "${JSON.stringify(item)}".`);
    }
  });

  return result;
}
