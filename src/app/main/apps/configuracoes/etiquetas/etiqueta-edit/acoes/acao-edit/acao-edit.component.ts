import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import {Acao, ModalidadeEtiqueta} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Etiqueta} from '@cdk/models';
import {getEtiqueta} from '../../store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../../store/reducers';

@Component({
    selector: 'acao-edit',
    templateUrl: './acao-edit.component.html',
    styleUrls: ['./acao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoEditComponent implements OnInit, OnDestroy {
    routerState: any;
    action: string;
    componentUrl:string;
    acao$: Observable<Acao>;
    acao: Acao;
    formIsValid: boolean = false;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    etiqueta$: Observable<Etiqueta>;
    etiqueta: Etiqueta;

    triggerAcaoList: { id:number, valor:string, descricao:string, modalidadeEtiqueta:ModalidadeEtiqueta}[] = [];
    triggerAcaoDefaultValues: {id:number, valor:string, descricao:string, modalidadeEtiqueta:ModalidadeEtiqueta}[] = [
        {
            id: 1,
            valor: 'Minuta',
            descricao: 'Gera automaticamente uma minuta na tarefa etiquetada de acordo com o modelo pré-selecionado',
            modalidadeEtiqueta: {valor: 'TAREFA'}
        },
        {
            id: 2,
            valor: 'Distribuição automática',
            descricao: 'Distribuir as tarefas de forma automática ou por responsável.',
            modalidadeEtiqueta: {valor: 'TAREFA'}
        },
        {
            id: 3,
            valor: 'Compartilhamento',
            descricao: 'Compartilha a tarefa entre usuários.',
            modalidadeEtiqueta: {valor: 'TAREFA'}
        },
        {
            id: 4,
            valor: 'Ofício',
            descricao: 'Gera automaticamente um oficio na tarefa etiquetada',
            modalidadeEtiqueta: {valor: 'TAREFA'}
        },
    ];

    /**
     * @param _store
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.AcaoEditAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.acao$ = this._store.pipe(select(fromStore.getAcao));
        this.etiqueta$ = this._store.pipe(select(getEtiqueta));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                this.action = '';
                if (routerState) {
                    this.routerState = routerState.state;
                    this.componentUrl = 'acoes/editar/'+this.routerState.params.acaoHandle;
                    const currentUrl = this.routerState.url;
                    if (
                        currentUrl.substr(currentUrl.length-this.componentUrl.length, this.componentUrl.length)
                        == this.componentUrl
                    ) {
                        this.action = 'form-cadastro';
                    }
                }
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.etiqueta$.subscribe(
            etiqueta => {
                this.etiqueta = etiqueta;
            }
        );

        this.acao$.subscribe(
            acao => this.acao = acao
        )

        if (!this.acao) {
            this.acao = new Acao();
            this.acao.etiqueta = this.etiqueta;
        }

        this.loadTriggers();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    goBack(): void {
        this._router.navigate([this.routerState.url.replace(this.componentUrl, 'acoes/listar')]);
    }

    loadTriggers(): void {
        this.triggerAcaoDefaultValues.forEach((trigger: any) => {
            if (this.etiqueta.modalidadeEtiqueta.valor == trigger.modalidadeEtiqueta.valor) {
                this.triggerAcaoList.push(trigger);
            }
        })
    }

    /**
     * @param triggerAcao
     */
    selectTrigger(triggerAcao): void {
        console.log(triggerAcao);
        this._router.navigate([this.routerState.url+'/'+triggerAcao.id+'/trigger']);
    }
}
