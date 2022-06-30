import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CdkMatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Constructor
     *
     * @param _mediaObserver
     */
    constructor(
        private _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.activeMediaQuery = '';

        // Initialize
        this._init();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void
    {
        this._mediaObserver.asObservable()
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((change: MediaChange[]) => {
                change.forEach((item) => {
                    if ( this.activeMediaQuery !== item.mqAlias )
                    {
                        this.activeMediaQuery = item.mqAlias;
                        this.onMediaChange.next(item.mqAlias);
                    }
                });
            });
    }

}
