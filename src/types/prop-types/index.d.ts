declare namespace PropTypes {
  type Validator<T> = (...args: unknown[]) => Error | null;
  type Requireable<T> = Validator<T> & { isRequired: Validator<T> };

  interface ValidationMap<T> {
    [key: string]: Validator<unknown>;
  }

  const any: Requireable<unknown>;
  const array: Requireable<unknown[]>;
  const bool: Requireable<boolean>;
  const func: Requireable<(...args: unknown[]) => unknown>;
  const number: Requireable<number>;
  const object: Requireable<Record<string, unknown>>;
  const string: Requireable<string>;
  const node: Requireable<unknown>;
  const element: Requireable<unknown>;
  const symbol: Requireable<symbol>;

  function arrayOf<T>(type: Validator<T>): Requireable<T[]>;
  function instanceOf<T>(expectedClass: new (...args: never[]) => T): Requireable<T>;
  function objectOf<T>(type: Validator<T>): Requireable<Record<string, T>>;
  function oneOf<T>(types: readonly T[]): Requireable<T>;
  function oneOfType(types: readonly Validator<unknown>[]): Requireable<unknown>;
  function shape<T>(type: ValidationMap<T>): Requireable<T>;
  function exact<T>(type: ValidationMap<T>): Requireable<T>;
}

declare module "prop-types" {
  export = PropTypes;
}
