import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tramitacao-view',
    templateUrl: './tramitacao-view.component.html',
    styleUrls: ['./tramitacao-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TramitacaoViewComponent implements OnInit, OnDestroy {

    routerState: any;
    binary$: Observable<any>;

    src: any;
    loading = false;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _sanitizer
     * @param _store
     * @param _location
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.TramitacaoViewAppState>,
        private _location: Location
    ) {
        this.binary$ = this._store.pipe(select(fromStore.getBinary));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {

        this.binary$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((binary) => {
            if (binary.src.conteudo) {
                const byteCharacters = atob(binary.src.conteudo.split(';base64,')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: 'text/html'});
                const URL = window.URL;
                this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            } else {
                this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
            }
            this.loading = binary.loading;
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    back(): void {
        this._location.back();
    }
}
