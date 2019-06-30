import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {DocumentoAvulso} from '@cdk/models/documento-avulso.model';
import {Documento} from '@cdk/models/documento.model';

@Component({
    selector: 'documento-avulso-edit',
    templateUrl: './documento-avulso-edit.component.html',
    styleUrls: ['./documento-avulso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoAvulsoEditComponent implements OnInit, OnDestroy {

    documento$: Observable<any>;
    documento: Documento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    /**
     * @param _store
     * @param _location
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.subscribe(documento => this.documento = documento);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    remeterDocumentoAvulso(): void {
        this._store.dispatch(new fromStore.RemeterDocumentoAvulso(this.documento.documentoAvulsoRemessa));
    }

    back(): void {
        this._location.back();
    }

    submit(values): void {

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));
    }

}
