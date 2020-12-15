import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Afastamento, Usuario} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';

@Component({
    selector: 'afastamento-edit',
    templateUrl: './afastamento-edit.component.html',
    styleUrls: ['./afastamento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AfastamentoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    afastamento$: Observable<Afastamento>;
    afastamento: Afastamento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    modalidadeAfastamentoPagination: Pagination;
    linkCaminhos: [object] = [{}];

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     * @param sanitized
     */
    constructor(
        private _store: Store<fromStore.AfastamentoEditAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.afastamento$ = this._store.pipe(select(fromStore.getAfastamento));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.modalidadeAfastamentoPagination = new Pagination();

        this.modalidadeAfastamentoPagination.populate = ['populateAll'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.afastamento$.subscribe(
            afastamento => this.afastamento = afastamento
        );

        if (!this.afastamento) {
            this.afastamento = new Afastamento();
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

    // carregarCaminho(caminho: string, inicioPath: string) {
    //     let caminhoAux = '';
    //     let caminhoAnterior = '';
    //     let chave = '';
    //     let valor = '';
    //     const posicao = caminho.search(inicioPath);
    //     const raiz = caminho.slice(0, posicao-1);
    //     caminho = caminho.slice(posicao, caminho.length);
    //     const arrayCaminho = caminho.split("/");
    //     console.log("arrayCaminho", arrayCaminho);
    //     arrayCaminho.forEach((c:string) => {
    //         if(c) {
    //             // caminhoAux += '/' + c;
    //             if (!Number(c) && c!=='editar') {
    //                 caminhoAux += '/' + c;
    //                 chave = `${raiz}${caminhoAux}/listar`;
    //                 valor = c;
    //                 caminhoAnterior = c;
    //                 this.linkCaminhos.push({link: chave, label: valor});
    //             } else if(c!=='editar') {
    //                 chave = `${raiz}${caminhoAux}/editar/${c}`;
    //                 caminhoAux += '/' + c;
    //                 valor = `${caminhoAnterior} ${c}`;
    //                 this.linkCaminhos.push({link: chave, label: valor});
    //             }
    //         }
    //     });
    //     this.linkCaminhos.shift();
    //     console.log("this.linkCaminhos", this.linkCaminhos);
    // }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const afastamento = new Afastamento();
        Object.entries(values).forEach(
            ([key, value]) => {
                afastamento[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveAfastamento(afastamento));

    }

}
