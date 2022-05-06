import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {BehaviorSubject, Observable, scan} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable({providedIn: 'root'})
export class RouterHistoryService {
    private _previousUrl: NavigationUrl;
    private _currentUrl: NavigationUrl;
    private _routerHistory$: BehaviorSubject<RouterHistory> = new BehaviorSubject<RouterHistory>(null);
    private _routerHistory: RouterHistory;

    constructor(private _router: Router,
                private _location: Location) {
        this._router.events
            .pipe(
                filter(event =>(event instanceof NavigationStart || event instanceof NavigationEnd)),
                scan<NavigationStart | NavigationEnd, RouterHistory>(
                    (routerHistory, event) => {
                        if (event instanceof NavigationStart) {
                            return {
                                ...routerHistory,
                                event,
                                trigger: event.navigationTrigger,
                                id: event.id,
                                idToRestore:
                                    (event.restoredState && event.restoredState.navigationId) ||
                                    undefined
                            };
                        }
                        const history = [...routerHistory.history];
                        let currentIndex = routerHistory.currentIndex;
                        if (routerHistory.trigger === 'imperative') {
                            history.splice(currentIndex + 1);
                            history.push({ id: routerHistory.id, url: event.urlAfterRedirects, skipLocation: this._router.getCurrentNavigation().extras?.skipLocationChange === true});
                            currentIndex = history.length - 1;
                        }
                        if (routerHistory.trigger === 'popstate') {
                            const id = history.findIndex(x => x.id === routerHistory.idToRestore);
                            if (id > -1) {
                                currentIndex = id;
                                history[id].id = routerHistory.id;
                            } else {
                                currentIndex = 0;
                            }
                        }
                        return {
                            ...routerHistory,
                            event,
                            history,
                            currentIndex
                        };
                    },
                    {
                        event: null,
                        history: [],
                        trigger: null,
                        id: 0,
                        idToRestore: 0,
                        currentIndex: 0
                    }
                ),
                tap((history: RouterHistory) => {
                    this._routerHistory = history;
                    this._routerHistory$.next(this._routerHistory);
                }),
                // filter out so we only act when navigation is done
                filter((routerHistory: RouterHistory) => routerHistory.event instanceof NavigationEnd && !!routerHistory.trigger)
            )
            .subscribe((routerHistory: RouterHistory) => {
                const previousUrl = routerHistory.history[routerHistory.currentIndex - 1];
                if (!previousUrl?.skipLocation) {
                    this._previousUrl = previousUrl;
                }
                this._currentUrl = routerHistory.history[routerHistory.currentIndex];
            });
    }

    public routerHistoryChanges(): Observable<RouterHistory> {
        return this._routerHistory$.asObservable();
    }

    public getRouterHistory(): RouterHistory {
        return this._routerHistory;
    }

    public historyGo(id?: number): void {

        if (id) {
            const navigationUrl = this._routerHistory.history.find((history) => history.id == id);

            if (navigationUrl) {
                this._location.historyGo(-1*this._routerHistory.history.indexOf(navigationUrl));
                return;
            }
        }

        this._location.back();
    }

    public navitateToPreviousUrl(): Promise<boolean> {
        if (!this._previousUrl) {
            this._location.back();
            return Promise.resolve(true);
        }
        return this._router.navigateByUrl(this._previousUrl.url);
    }

    public getCurrentUrl(): NavigationUrl {
        return this._currentUrl;
    }

    public getPreviousUrl(): NavigationUrl {
        return this._previousUrl;
    }

}

export interface RouterHistory {
    history: NavigationUrl[];
    currentIndex: number;

    event: NavigationStart | NavigationEnd;
    trigger: 'imperative' | 'popstate' | 'hashchange';
    id: number;
    idToRestore: number;
}

export interface NavigationUrl {
    id: number;
    url: string;
    skipLocation: boolean;
}
