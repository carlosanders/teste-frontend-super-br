import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import {Aviso, Pagination} from '@cdk/models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {LoginService} from '../../../../auth/login/login.service';
import {Back, getRouterState} from '../../../../../store';
import {takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'aviso-edit',
    templateUrl: './aviso-edit.component.html',
    styleUrls: ['./aviso-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AvisoEditComponent implements OnInit {

    private _unsubscribeAll: Subject<any> = new Subject();

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    aviso: Aviso;
    aviso$: Observable<Aviso>;
    orgaoCentralPagination: Pagination;
    unidadePagination: Pagination;
    setorPagination: Pagination;
    formAviso: FormGroup;

    constructor(
        private _store: Store<fromStore.AvisoEditAppState>,
        private _router: Router,
        private _loginService: LoginService,
        private _formBuilder: FormBuilder
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.aviso$ = this._store.pipe(select(fromStore.getAviso));

        this.orgaoCentralPagination = new Pagination();
        this.orgaoCentralPagination.populate = ['populateAll'];

        this.unidadePagination = new Pagination();
        this.unidadePagination.populate = ['populateAll'];

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.aviso$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (aviso) => {
                if (aviso) {
                    this.aviso = aviso;
                }
            }
        );

        if (!this.aviso) {
            this.aviso = new Aviso();
            this.aviso.ativo = true;
        }

        this.loadForm();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnInit(): void {

    }

    loadForm(): void {
        this.formAviso = this._formBuilder.group({
            id: [null],
            ativo: [null],
            nome: [null, [Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.required, Validators.maxLength(255)]],
            modalidadeOrgaoCentral:[null],
            unidade: [null],
            setor: [null],
            tipo: [null],
            sistema: [null],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    submitAviso(values): void {
        const aviso = new Aviso();
        Object.entries(values).forEach(
            ([key, value]) => {
                aviso[key] = value;
            }
        );

        if(aviso.tipo == 'SIS')
        {
            aviso.sistema = true;
        }

        if (aviso.setor) {
            aviso.unidade = null;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAviso({
            aviso: aviso,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }


}
