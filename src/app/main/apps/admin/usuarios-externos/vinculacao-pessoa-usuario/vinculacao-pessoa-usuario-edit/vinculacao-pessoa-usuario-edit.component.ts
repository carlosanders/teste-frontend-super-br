import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {Pagination, Usuario, VinculacaoPessoaUsuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {LoginService} from '../../../../../auth/login/login.service';
import {getRouterState} from '../../../../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'vinculacao-pessoa-usuario-edit',
    templateUrl: './vinculacao-pessoa-usuario-edit.component.html',
    styleUrls: ['./vinculacao-pessoa-usuario-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoPessoaUsuarioEditComponent implements OnInit {

    routerState: any;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    pessoaPagination: Pagination;
    usuarioExterno: Usuario;

    constructor(
        private _store: Store<fromStore.VinculacaoPessoaUsuarioEditAppState>,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.pessoaPagination = new Pagination();

        this.usuarioExterno = new Usuario();
        this.usuarioExterno.id = this.routerState.params.usuariosExternosHandler;
    }

    ngOnInit(): void {
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {
        const vinculacaoPessoaUsuario = new VinculacaoPessoaUsuario();
        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoPessoaUsuario[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveVinculacaoPessoaUsuario({
            vinculacaoPessoaUsuario: vinculacaoPessoaUsuario,
            operacaoId: operacaoId
        }));
    }
}
