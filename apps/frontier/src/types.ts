declare const idSymbol: unique symbol;
export type ID = number & { [idSymbol]: never };
