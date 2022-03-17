import {from, Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import IDBCache from '@drecom/idb-cache';
import md5 from 'crypto-js/md5';
import {Injectable} from '@angular/core';


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

export abstract class BaseCacheService<T> {
    protected _db: IDBCache;
    protected _dbName: string;
    protected _cacheConfig: CacheConfig;
    protected _idbError: boolean = false;

    /**
     * Inicializa a instancia do IDBCache no serviço
     * @private
     */
    protected _dbFactory(): void {
        try {
            this._db = new IDBCache(
                this._dbName,
                this._cacheConfig || CacheDefaults.DEFAULT_APP_DB_CACHE_CONFIG
            );
        } catch (error) {
            this._setIDBError('[Cache Service] Cannot access IDB, bypassing usage.');
        }
    }

    protected _setIDBError(msg:string): void {
        this._idbError = true;
        console.info(msg);
    }

    get(key: string): Observable<T|T[]> {
        if (this._idbError) {
            return of(null);
        }
        return from(
            this._db.get(key)
                .catch((error) => {
                    if (![IDBCache.ERROR.UNKNOWN, IDBCache.ERROR.GET_EMPTY].includes(error)) {
                        this._setIDBError('[Cache Service] Cannot access IDB, bypassing get cached data.');
                        throw error;
                    }
                })
        )
            .pipe(
                switchMap(((value: any) => of(JSON.parse(value || null)))),
                catchError((error, caught) => of(false))
            );
    }

    set(value: Object|Object[], key: string, maxAge?: number): Observable<boolean> {
        if (this._idbError) {
            return of(false);
        }
        return from(
            this._db
                .set(
                    key,
                    JSON.stringify(value).toString(),
                    maxAge || CacheDefaults.DEFAULT_APP_DB_CACHE_CONFIG.defaultAge
                )
                .catch((error) => {
                    this._setIDBError('[Cache Service]: Cannot access IDB, bypassing update cached data.');
                    throw error;
                })
        )
            .pipe(
                switchMap(() => of(true)),
                catchError((error, caught) => of(false))
            );
    }

    delete(key: string): Observable<boolean> {
        if (this._idbError) {
            return of(false);
        }
        return from(
            this._db
                .delete(key)
                .catch((error) => {
                    this._setIDBError('[Cache Service]: Cannot access IDB, bypassing update cached data.');
                    throw error;
                })
        )
            .pipe(
                switchMap(() => of(true)),
                catchError((error, caught) => of(false))
            );
    }
}

@Injectable({providedIn: 'root'})
export class CacheModelService<T> extends BaseCacheService<T>{

    private _modelName: string;

    /**
     * Chamada necessária para inicializar o IDBCache no construtor do componente qua a utilizar para contornar características das biblioteca utilizada
     * @param dbName
     * @param modelInstance
     * @param cacheConfig
     */
    initialize(
        dbName: string,
        modelInstance: new (...args: any[]) => T,
        cacheConfig?: CacheConfig
    ): void {
        if (!this._db) {
            this._modelName = modelInstance.constructor.name;
            this._dbName = dbName;
            this._cacheConfig = cacheConfig || this._cacheConfig;
            this._dbFactory();
        }
    }

    get(key: string): Observable<T|T[]> {
        return super.get(this._getKey(key));
    }

    set(value: Object|Object[], key: string, maxAge?: number): Observable<boolean> {
        return super.set(value, this._getKey(key), maxAge);
    }

    delete(key: string): Observable<boolean> {
        return super.delete(this._getKey(key));
    }

    /**
     * Retorna a key utilizada para armazenar o cache da model no IDB
     * @param key
     * @private
     */
    private _getKey(key: string): string {
        return md5(`${this._modelName}${CacheDefaults.DEFAULT_DB_KEY_SEPARATOR}${key}`).toString();
    }
}
