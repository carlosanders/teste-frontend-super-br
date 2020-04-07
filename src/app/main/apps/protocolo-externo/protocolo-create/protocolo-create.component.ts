import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination, Pessoa, Processo} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {getPessoa} from '../store/selectors';

@Component({
    selector: 'protocolo-create',
    templateUrl: './protocolo-create.component.html',
    styleUrls: ['./protocolo-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProtocoloCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoaProcedencia$: Observable<Pessoa>;
    pessoaProcedencia: Pessoa;

    unidadePagination: Pagination;

    processo: Processo;

    routerState: any;

    formProcesso: FormGroup;


    /**
     *
     * @param _store
     * @param dialog
     * @param _router
     * @param _formBuilder
     */
    constructor(
        private _store: Store<fromStore.ProtocoloCreateAppState>,
        public dialog: MatDialog,
        private _router: Router,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoaProcedencia$ = this._store.pipe(select(getPessoa));

        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['unidade', 'parent'];
        this.unidadePagination.filter = {parent: 'isNull'};

        this.formProcesso = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            NUP: [null],
            novo: [null],
            especieProcesso: [null],
            visibilidadeExterna: [null],
            titulo: [null],
            descricao: [null, [Validators.maxLength(255)]],
            outroNumero: [null],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null],
            modalidadeMeio: [null],
            modalidadeFase: [null],
            dataHoraAbertura: [null],
            dataHoraPrazoResposta: [null, [Validators.required]],
            unidadeProtocoloExterno: [null, [Validators.required]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]]
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });


        this.pessoaProcedencia$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(pessoa => !!pessoa)
        ).subscribe(pessoa => {
            this.pessoaProcedencia = pessoa;
        });

        this.processo = new Processo();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        if (this.dialog) {
            this.dialog.closeAll();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        processo.procedencia = this.pessoaProcedencia;

        this._store.dispatch(new fromStore.SaveProcesso(processo));
    }

}
