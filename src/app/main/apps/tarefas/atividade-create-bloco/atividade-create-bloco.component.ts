import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Atividade} from '@cdk/models/atividade.model';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models/tarefa.model';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models/documento.model';
import {Router} from '@angular/router';
import * as fromStore from './store';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';

@Component({
    selector: 'atividade-create-bloco',
    templateUrl: './atividade-create-bloco.component.html',
    styleUrls: ['./atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AtividadeCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];
    tarefasSelecionadasListId: any[] = [];

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: any;

    routerState: any;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId$: Observable<number[]>;
    convertendoDocumentosId: number[] = [];

    /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.AtividadeCreateBlocoAppState>,
        private _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile();

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        //this.convertendoDocumentosId$ = this._store.pipe(select(fromStore.getConvertendoDocumentosId));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */    
    ngOnInit(): void {
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();
        this.atividade.usuario = this._profile.usuario;

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;

            if (this.tarefas) {

                const tarefasListId: any[] = [];
                this.tarefas.forEach((tarefa) => {
                    tarefasListId.push(tarefa.id);
                });
    
                if (tarefasListId.sort().toString() !== this.tarefasSelecionadasListId.sort().toString() ) {
                    this._store.dispatch(new fromStore.GetDocumentos(tarefasListId.toString()));
                }
            }

        });

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'atividade')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                this.operacoes = [];
            }
        });

        //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        /*if (this.tarefas) {
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
            const tarefasListId: any[] = [];
            this.tarefas.forEach((tarefa) => {
                tarefasListId.push(tarefa.id);
            });
            console.log("tttttttttttttttttttttttttttttttttttttttttt");
            this._store.dispatch(new fromStore.GetDocumentos(tarefasListId.toString()));
        }*/

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.minutas = documentos;
                //console.log("this._changeDetectorRef.markForCheck();");
                this._changeDetectorRef.markForCheck();
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        this.operacoes = [];

        this.tarefas.forEach(tarefa => {
            const atividade = new Atividade();

            Object.entries(values).forEach(
                ([key, value]) => {
                    atividade[key] = value;
                }
            );

            atividade.tarefa = tarefa;

            this._store.dispatch(new fromStore.SaveAtividade(atividade));
        });
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    }

    doAssinatura(documentoId): void {
         this._store.dispatch(new fromStore.AssinaDocumento(documentoId));
    }

    onClicked(documento): void {
         this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doConverte(documentoId): void {
        //this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }
}
