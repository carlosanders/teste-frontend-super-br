import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Modelo} from '@cdk/models/modelo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario} from '@cdk/models/usuario.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getRouterState} from '../../../../../store/reducers';
import {Lotacao, ModalidadeModelo, Setor} from '@cdk/models';

@Component({
    selector: 'coordenador-modelos-edit',
    templateUrl: './modelos-edit.component.html',
    styleUrls: ['./modelos-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEditComponent implements OnInit, OnDestroy {

    routerState: any;
    modelo$: Observable<Modelo>;
    modelo: Modelo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    coordenador: boolean;
    setorPagination: Pagination;
    templatePagination: Pagination;

    setores: Setor[] = [];

    /**
     *
     * @param _store
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.ModeloEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
        this.usuario = this._loginService.getUserProfile();
        this.coordenador = true;

        this._loginService.getUserProfile().colaborador.lotacoes.forEach((lotacao: Lotacao) => {
            if (!this.setores.includes(lotacao.setor) && lotacao.coordenador) {
                this.setores.push(lotacao.setor);
            }
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'id': 'in:' + this.setores.map(setor => setor.id).join(',')
        }

        this.templatePagination = new Pagination();
        this.templatePagination.populate = ['documento', 'documento.tipoDocumento'];

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.modelo$.subscribe(
            modelo => {
                if (modelo) {
                    this.modelo = modelo;
                    if (this.modelo.vinculacoesModelos[0]?.setor) {
                        this.modelo.setor = this.modelo.vinculacoesModelos[0]?.setor;
                    }
                    if (this.modelo.vinculacoesModelos[0]?.usuario) {
                        this.modelo.usuario = this.modelo.vinculacoesModelos[0]?.usuario;
                    }
                }
            }
        );

        if (!this.modelo) {
            this.modelo = new Modelo();
            this.modelo.ativo = true;
        }
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

        const modelo = new Modelo();
        modelo.modalidadeModelo = new ModalidadeModelo();

        Object.entries(values).forEach(
            ([key, value]) => {
                modelo[key] = value;
            }
        );

        if (modelo['nacional']) {
           modelo.modalidadeModelo.id = 4;
        } else {
           modelo.modalidadeModelo.id = 3;
        }

        this._store.dispatch(new fromStore.SaveModelo(modelo));

    }

}
