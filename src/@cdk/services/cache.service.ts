import {from, Observable, of, Subject} from 'rxjs';
import {catchError, delay, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import IDBCache from '@drecom/idb-cache';
import md5 from 'crypto-js/md5';
import {Injectable, OnDestroy} from '@angular/core';
import {LoginService} from '../../app/main/auth/login/login.service';
import {Usuario} from '../models';


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

    protected _setIDBError(msg: string): void {
        this._idbError = true;
        console.info(msg);
    }

    get(key: string): Observable<T | T[]> {
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

    set(value: Object | Object[], key: string, maxAge?: number): Observable<boolean> {
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
export class CacheModelService<T> extends BaseCacheService<T> {

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

    get(key: string): Observable<T | T[]> {
        return super.get(this._getKey(key));
    }

    set(value: Object | Object[], key: string, maxAge?: number): Observable<boolean> {
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

@Injectable({providedIn: 'root'})
export class CacheGenericUserDataService extends BaseCacheService<any> implements OnDestroy {

    private _unsubscribeAll: Subject<boolean> = new Subject<boolean>();
    private _usuario: Usuario;

    constructor(private _loginService: LoginService) {
        super();
        this._usuario = this._loginService.getUserProfile();
        this._loginService
            .getUserProfileChanges()
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((usuario: Usuario) => !!usuario)
            )
            .subscribe((usuario: Usuario) => this._usuario = usuario);

        of(this._usuario)
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter((usuario: Usuario) => !!usuario)
            )
            .pipe(
                tap((usuario: Usuario) => {
                    if (!this._db) {
                        this._dbName = usuario.username;
                        this._dbFactory();
                    }
                })
            )
            .subscribe();

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    get(key: string): Observable<any> {
        return of(this._db)
            .pipe(filter((db: IDBCache) => !!db))
            .pipe(delay(100))
            .pipe(switchMap(() => super.get(key)));
    }

    set(value: Object | Object[], key: string, maxAge?: number): Observable<boolean> {
        return of(this._db)
            .pipe(filter((db: IDBCache) => !!db))
            .pipe(delay(100))
            .pipe(switchMap(() => super.set(value, key, maxAge)))
    }

    delete(key: string): Observable<boolean> {
        return of(this._db)
            .pipe(filter((db: IDBCache) => !!db))
            .pipe(delay(100))
            .pipe(switchMap(() => super.delete(key)))
    }
}
