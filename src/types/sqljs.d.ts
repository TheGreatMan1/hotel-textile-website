declare module "sql.js" {
  export type SqlValue = string | number | Uint8Array | null;

  export type QueryExecResult = {
    columns: string[];
    values: SqlValue[][];
  };

  export class Statement {
    bind(values?: SqlValue[] | Record<string, SqlValue>): boolean;
    run(values?: SqlValue[] | Record<string, SqlValue>): void;
    step(): boolean;
    get(): SqlValue[];
    getAsObject(): Record<string, SqlValue>;
    free(): boolean;
  }

  export class Database {
    constructor(data?: Uint8Array);
    run(sql: string, params?: SqlValue[] | Record<string, SqlValue>): Database;
    exec(sql: string, params?: SqlValue[] | Record<string, SqlValue>): QueryExecResult[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  export type SqlJsStatic = {
    Database: typeof Database;
  };

  export default function initSqlJs(config?: {
    locateFile?: (file: string) => string;
    wasmBinary?: Uint8Array;
  }): Promise<SqlJsStatic>;
}
