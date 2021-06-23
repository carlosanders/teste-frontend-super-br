import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {DocumentoAvulso, Pagination, Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store/selectors';
import * as moment from 'moment';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'documento-avulso-edit',
    templateUrl: './documento-avulso-edit.component.html',
    styleUrls: ['./documento-avulso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoEditComponent implements OnInit, OnDestroy {

    documentoAvulso$: Observable<DocumentoAvulso>;
    documentoAvulso: DocumentoAvulso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    documentoAvulsoAdministrativoPagination: Pagination;
    logEntryPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.documentoAvulso$ = this._store.pipe(select(fromStore.getDocumentoAvulso));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.documentoAvulsoAdministrativoPagination = new Pagination();
        this.documentoAvulsoAdministrativoPagination.populate = ['parent'];
        this.logEntryPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.documentoAvulso$.subscribe((documentoAvulso) => {
            this.documentoAvulso = documentoAvulso;

        });

        if (!this.documentoAvulso) {
            this.documentoAvulso = new DocumentoAvulso();
            this.documentoAvulso.mecanismoRemessa = 'interna';
            this.documentoAvulso.processo = this.processo;
            this.documentoAvulso.dataHoraInicioPrazo = moment();
            this.documentoAvulso.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});
        }
        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\DocumentoAvulso',
            id: + this.documentoAvulso.id
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
