import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Classificacao, Pagination, Pessoa, Processo, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getProcesso} from './store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {MercureService} from '@cdk/services/mercure.service';
import {Back} from '../../../../../store';
import {MatDialog} from '@cdk/angular/material';
import {CdkUtils} from '../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';
import {
    CdkProcessoModalCalculoNupComponent
} from "../../../../../../@cdk/components/processo/cdk-processo-modal-calculo-nup/cdk-processo-modal-calculo-nup.component";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    form: FormGroup;

    calculoNupDialogRef: MatDialogRef<CdkProcessoModalCalculoNupComponent>;

    _profile: Usuario;

    especieProcessoPagination: Pagination;
    setorAtualPagination: Pagination;
    classificacaoPagination: Pagination;
    configuracaoNupPagination: Pagination;
    logEntryPagination: Pagination;
    assuntoPagination: Pagination;

    routerState: any;

    procedencia: Pessoa;

    genero = 'ADMINISTRATIVO';

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _router
     * @param _loginService
     * @param dialog
     * @param _mercureService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _mercureService: MercureService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = this._loginService.getUserProfile();

        this.form = this._formBuilder.group({
            id: [null],
            temProcessoOrigem: [null],
            processoOrigem: [null],
            processoOrigemIncluirDocumentos: [null],
            // eslint-disable-next-line @typescript-eslint/naming-convention
            NUP: [null, [Validators.required, Validators.maxLength(21)]],
            tipoProtocolo: [null, [Validators.required]],
            unidadeArquivistica: [null, [Validators.required]],
            especieProcesso: [null, [Validators.required]],
            visibilidadeExterna: [null],
            titulo: [null, [Validators.required, Validators.required, Validators.maxLength(255)]],
            descricao: [null, [Validators.maxLength(255)]],
            outroNumero: [null, [Validators.maxLength(255)]],
            valorEconomico: [null],
            semValorEconomico: [null],
            classificacao: [null, [Validators.required]],
            procedencia: [null, [Validators.required]],
            localizador: [null],
            setorAtual: [null, [Validators.required]],
            modalidadeMeio: [null, [Validators.required]],
            modalidadeFase: [null],
            dataHoraAbertura: [null, [Validators.required]],
            dataHoraDesarquivamento: [null],
            configuracaoNup: [null, [Validators.required]],
            nupInvalido: [null],
            chaveAcesso: [null],
            alterarChave: [false]
        });

        this.especieProcessoPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
        this.configuracaoNupPagination = new Pagination();
        this.assuntoPagination = new Pagination();

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            if (this.processo && processo && (this.processo.id !== processo.id) && this.processo.origemDados) {
                this._mercureService.unsubscribe(this.processo.origemDados['@id']);
            }
            if (processo?.origemDados) {
                this._mercureService.subscribe(processo.origemDados['@id']);
            }
            this.processo = processo;
            this.genero = this.processo?.especieProcesso?.generoProcesso?.nome;
            this._changeDetectorRef.markForCheck();
        });

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 1;
            this.processo.tipoProtocolo = 1;
        }

        this.logEntryPagination.filter = {
            entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo',
            id: +this.processo.id
        };
        this.especieProcessoPagination.populate = ['classificacao', 'generoProcesso', 'modalidadeMeio', 'workflow'];
        this.especieProcessoPagination.filter = {'generoProcesso.nome': 'eq:' + this.genero};
        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.filter = {permissaoUso: 'eq:true'};
        this.classificacaoPagination.populate = ['parent'];
        this.assuntoPagination.populate = ['parent'];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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

        if (this.processo && this.processo.id) {
            processo.setorInicial = this.processo.setorInicial ? this.processo.setorInicial : null;
            processo.NUP = this.processo.NUP
                .replace(/[^\w\-]+/g, '')
                .replace(/-+/g, '');
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveProcesso({
            processo: processo,
            operacaoId: operacaoId
        }));
    }

    abort(): void {
        this._store.dispatch(new Back());
    }

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.procedencia = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    doSelectClassificacao(classificacao: Classificacao | null): void {
        //o- @todo verificar se vai existir algum aviso
        // if (classificacao && classificacao.visibilidadeRestrita === true && this.processo.acessoRestrito !== true) {
        //     this.dialog.open(CdkProcessoModalClassificacaoRestritaComponent, {
        //         data: [this.processo],
        //         hasBackdrop: false,
        //         closeOnNavigation: true
        //     });
        // }
    }

    gerirProcedencia(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editProcedencia(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

    calcularNup(nup?: string): void {

        this.calculoNupDialogRef = this.dialog.open(CdkProcessoModalCalculoNupComponent, {
            data: {
                nup
            },
            width: '650px',
            height: '280px',
        });

        this.calculoNupDialogRef.afterClosed().subscribe((nup?: string) => {
            if (nup) {
                console.log('Confirmado: ', nup);
                this.form.patchValue({NUP: nup});
            }
            this.calculoNupDialogRef = null;
        });
    }

}
