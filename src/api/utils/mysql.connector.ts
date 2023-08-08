import { createPool, Pool } from 'mysql2';
import { DATA_SOURCES } from './../../config/vars.config';
const dataSource = DATA_SOURCES.mySqlDataSource;

let pool: Pool;

export const init = () => {
  try {
    pool = createPool({
      connectionLimit: dataSource.DB_CONNECTION_LIMIT,
      host: dataSource.DB_HOST,
      user: dataSource.DB_USER,
      password: dataSource.DB_PASSWORD,
      database: dataSource.DB_DATABASE,
      port: 3306,
    });

    console.debug('MySql Adapter Pool generated successfully');
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};

export const execute = <T>(query: string, params: any[]): Promise<T> => {
  try {
    if (!pool)
      throw new Error(
        'Pool was not created. Ensure pool is created when running the app.'
      );

    return new Promise<T>((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else resolve(results as T);
      });
    });
  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
};
