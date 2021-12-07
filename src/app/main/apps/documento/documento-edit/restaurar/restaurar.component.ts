import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {CdkUtils} from '@cdk/utils';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'documento-edit-restaurar',
    templateUrl: './restaurar.component.html',
    styleUrls: ['./restaurar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RestaurarComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;
    documento: Documento;

    isUndeleting$: Observable<boolean>;
    errors$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _location
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditRestaurarAppState>,
        private _location: Location,
        private _ref: ChangeDetectorRef
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        this.isUndeleting$ = this._store.pipe(select(fromStore.getIsUndeleting));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(documento => this.documento = documento);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doRestaurar(): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.UndeleteDocumento({
            documento: this.documento,
            operacaoId: operacaoId,
            redo: null,
            undo: null
        }));
    }

}
