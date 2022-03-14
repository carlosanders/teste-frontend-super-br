import {from, Observable, of} from 'rxjs';
import {catchError, switchMap} from "rxjs/operators";
import IDBCache from "@drecom/idb-cache";
import md5 from 'crypto-js/md5';
import {Injectable} from "@angular/core";


export interface CacheConfig {
    size?: number;
    count?: number;
    defaultAge?: number;
}

export const CacheDefaults = {
    DEFAULT_APP_DB_NAME: 'supp_db',
    DEFAULT_DB_KEY_SEPARATOR: '-',
    DEFAULT_APP_DB_CACHE_CONFIG: {
        size: 104857600,
        count: 999,
        defaultAge: 86400,
    },
    DEFAULT_MODEL_DB_CACHE_CONFIG: {
        size: 104857600,
        count: 99,
        defaultAge: 28800,
    },
}

@Injectable({providedIn: 'root'})
export class CacheModelService<T> {

    private _dbName: string;
    private _cacheConfig: CacheConfig;
    private _modelName: string;
    private _db: IDBCache;

    /**
     * Inicializa a instancia do IDBCache no serviço
     * @private
     */
    private _dbFactory(): void {
        this._db = new IDBCache(
            this._dbName,
            this._cacheConfig || CacheDefaults.DEFAULT_MODEL_DB_CACHE_CONFIG
        );
    }

    /**
     * Retorna a key utilizada para armazenar o cache da model no IDB
     * @param key
     * @private
     */
    private _getKey(key: string): string {
        return md5(`${this._modelName}${CacheDefaults.DEFAULT_DB_KEY_SEPARATOR}${key}`).toString();
    }

    /**
     * Chamada necessária para inicializar o IDBCache no construtor do componente qua a utilizar para contornar características das biblioteca utilizada
     * @param dbName
     * @param modelInstance
     * @param cacheConfig
     */
    initialize(
        dbName: string,
        modelInstance: new (...args: any[]) => T,
        cacheConfig: CacheConfig = CacheDefaults.DEFAULT_MODEL_DB_CACHE_CONFIG
    ): void {
        if (!this._db) {
            this._modelName = modelInstance.constructor.name;
            this._dbName = dbName;
            this._cacheConfig = cacheConfig;
            this._dbFactory();
        }
    }

    get(key: string): Observable<T> {
        return from(this._db.get(this._getKey(key)))
            .pipe(
                switchMap(((value: any) => of(JSON.parse(value || null)))),
                catchError((err) => {
                    if ([IDBCache.ERROR.UNKNOWN, IDBCache.ERROR.GET_EMPTY].includes(err)) {
                        return of(null);
                    }
                    console.log('cache error get: ', err)
                    throw new Error(err);
                })
            );
    }

    set(value: Object|Object[], key: string, maxAge?: number): Observable<boolean> {
        return from(this._db.set(
            this._getKey(key),
            JSON.stringify(value).toString(),
            maxAge || CacheDefaults.DEFAULT_MODEL_DB_CACHE_CONFIG.defaultAge
        ))
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
    }

    delete(key: string): Observable<boolean> {
        return from(this._db.delete(this._getKey(key)))
            .pipe(
                switchMap(() => of(true)),
                catchError((err) => {
                    console.log('cache error delete: ', err);
                    return of(false);
                })
            );
    }
}
