import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {Atividade} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models';
import {getSelectedTarefas} from '../store/selectors';
import {getOperacoesState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {filter, takeUntil, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {Documento} from '@cdk/models';
import {Usuario} from "../../../../../@cdk/models/usuario.model";

@Component({
    selector: 'atividade-create-bloco',
    templateUrl: './atividade-create-bloco.component.html',
    styleUrls: ['./atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    selectedIds: number[] = [];
    componenteChamador: String = 'atividade-create-bloco';

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];
    tarefasSelecionadasListId: any[] = [];

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    operacoes: any[] = [];

    private _profile: Usuario;

    routerState: any;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];

    mapDocumentos = new Map();

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
        public _loginService: LoginService,
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
        //this.atividade.usuario = this._profile.usuario;
        this.atividade.usuario = this._profile;

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
            if (this.tarefas) {
                // cria array temporário com os ids da tarefas selecionadas 
                // para a movimentação em lote
                let tarefasListId: any[] = [];
                this.tarefas.forEach((tarefa) => {
                    tarefasListId.push(tarefa.id);
                });
                // verifica se houve alteração nas tarefas selecionadas para movimentação em lote
                if (tarefasListId.length > 0 && tarefasListId.sort().toString() !== this.tarefasSelecionadasListId.sort().toString() ) {
                    // lê os documentos das nova lista de tarefas selecionadas
                    this._store.dispatch(new fromStore.GetDocumentos(tarefasListId.toString()));
                    // guarda a nova lista de ids das tarefas selecionadas
                    this.tarefasSelecionadasListId = [...tarefasListId];
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

       /* this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();
        this.atividade.usuario = this._profile;

        if (this.tarefas) {

            const tarefasListId: any[] = [];
            this.tarefas.forEach((tarefa) => {
                tarefasListId.push(tarefa.id);
            });

            this._store.dispatch(new fromStore.GetDocumentos(tarefasListId.toString()));
        }*/

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.minutas = documentos;
                this._changeDetectorRef.markForCheck();
                
                    this.mapDocumentos.clear();
                    this.minutas.forEach(
                        doc => this.addToMapArray(
                                this.mapDocumentos,
                                `${doc.processoOrigem.NUP}-${doc.tarefaOrigem.id}`,
                                //`Processo: ${doc.processoOrigem.NUP}-Tarefa: ${doc.tarefaOrigem.id}`,                                
                                doc)
                    ); 
            },
        );
    }

    desmembraKeyMapArray(key:string) {
        return {
            'nup' : key.split('-')[0],
            'idTarefa': key.split('-')[1]
            /*'nup' : key.split('-')[0].split('Processo: ')[1],
            'idTarefa': key.split('-')[1],*/
        }
    }

    addToMapArray(map:any, chave:any, valor:any){
        map.has(chave) ? map.get(chave).push(valor) : map.set(chave,[valor]);
        /*if ( map.has(chave) ) {
            // verificar se já tem no array dentro da chave
            //if (map.get(chave).indexOf(valor) == -1) {
               map.get(chave).push(valor);
            //}   
        } else {
            map.set(chave,[valor]);
        }*/
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
            //atividade.documentos = this.minutas;
            this.selectedDocumentos$.subscribe(
                documentos => {
                    // Como no redux estão todos os documentos selecionados independetemente à qual tarefa pertencem,
                    // abaixo são inseridos na atividade apenas os documentos selecionados pertencentes a respectiva tarefa
                    atividade.documentos = documentos.filter(doc => doc.tarefaOrigem.id === tarefa.id);


                    //atividade.documentos = documentos;
                    //@retirar:
                    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"); 
                    console.log("atividade"); 
                    console.log(atividade);                    
                    console.log("atividade.documentos"); 
                    console.log(atividade.documentos);
                    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"); 


                }

            );

//sss
            /*console.log("this.selectedDocumentos$"); 
                console.log(this.selectedDocumentos$);*/
            this._store.dispatch(new fromStore.SaveAtividade(atividade));
        });
    }

    //changedSelectedIds(selectedIds): void {



    changedSelectedIds(selectedIds): void {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        console.log(selectedIds);
        selectedIds.forEach(element => {
            this._changedSelectedIds(element);
        });
        

        /*const selectedDocumentoIds = [...this.selectedIds];

        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }*/
        console.log(this.selectedIds);
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(this.selectedIds));

        //this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    _changedSelectedIds(documentoId): void {
        const selectedDocumentoIds = [...this.selectedIds];

        if (selectedDocumentoIds.find(id => id === documentoId) !== undefined) {
            this.selectedIds = selectedDocumentoIds.filter(id => id !== documentoId);
        } else {
            this.selectedIds = [...selectedDocumentoIds, documentoId];
        }
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
