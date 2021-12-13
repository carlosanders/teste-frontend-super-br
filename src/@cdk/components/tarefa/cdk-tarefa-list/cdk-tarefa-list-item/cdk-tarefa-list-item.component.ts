import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ComponentRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';

import {Tarefa} from '@cdk/models/tarefa.model';
import {DynamicService} from '../../../../../modules/dynamic.service';
import {modulesConfig} from '../../../../../modules/modules-config';
import {CdkTarefaListItemService} from './cdk-tarefa-list-item.service';
import {ComponenteDigital, Etiqueta, Usuario, VinculacaoEtiqueta} from '../../../../models';
import {HasTarefa} from './has-tarefa';
import {CdkUtils} from '../../../../utils';

@Component({
    selector: 'cdk-tarefa-list-item',
    templateUrl: './cdk-tarefa-list-item.component.html',
    styleUrls: ['./cdk-tarefa-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CdkTarefaListItemComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild('cdkUpload', {static: false}) cdkUpload;

    @Input()
    tarefa: Tarefa;

    @Input()
    selected: boolean;

    @Input()
    usuarioAtual: Usuario;

    @Input()
    deleting: boolean;

    @Input()
    undeleting: boolean;

    @Input()
    togglingUrgente: boolean;

    @Input()
    countSelected: number = 0;

    @Output()
    toggleInSelectedTarefas = new EventEmitter();

    @Output()
    delete = new EventEmitter<Tarefa>();

    @Output()
    compartilhar = new EventEmitter<number>();

    @Output()
    createDocumentoAvulso = new EventEmitter<number>();

    @Output()
    createTarefa = new EventEmitter<any>();

    @Output()
    movimentar = new EventEmitter<number>();

    @Output()
    editProcesso = new EventEmitter<any>();

    @Output()
    editTarefa = new EventEmitter<number>();

    @Output()
    assinaMinutas = new EventEmitter<Tarefa>();

    @Output()
    redistribuirTarefa = new EventEmitter<number>();

    @Output()
    cienciaTarefa = new EventEmitter<any>();

    @Output()
    toggleUrgente = new EventEmitter<Tarefa>();

    @Output()
    restauraTarefa = new EventEmitter<Tarefa>();

    @Output()
    removeTarefa = new EventEmitter<Tarefa>();

    @Output()
    editarObservacao = new EventEmitter<any>();

    @Output()
    salvarObservacao = new EventEmitter<any>();

    @Output()
    etiquetaClickHandler = new EventEmitter<{vinculacaoEtiqueta: VinculacaoEtiqueta; tarefa: Tarefa}>();

    @Output()
    loadAssuntos = new EventEmitter<any>();

    @Output()
    loadInteressados = new EventEmitter<any>();

    @Input()
    loadingAssuntosProcessosId: number[];

    @Input()
    loadingInteressados: boolean;

    @Input()
    totalInteressados: number;

    @Input()
    ciencia: boolean;

    @Input()
    dragging: boolean;

    @Input()
    savingVinculacaoEtiquetaId: number;

    @Input()
    assinando: boolean;

    @Input()
    editandoObservacao: boolean = false;

    @Input()
    savingObservacao: boolean = false;

    @Output()
    vinculacaoEtiquetaCreate = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaDelete = new EventEmitter<any>();

    @Output()
    vinculacaoEtiquetaEdit = new EventEmitter<any>();

    @Output()
    completed = new EventEmitter<ComponenteDigital>();

    /**
     * Disparado quando o upload de todos os componentes digitais for concluído, ou quando restarem apenas uploads com erro na fila
     */
    @Output()
    completedAll = new EventEmitter<number>();

    @Output()
    erroUpload = new EventEmitter<string>();

    @ViewChild('dynamicText', {static: false, read: ViewContainerRef})
    containerText: ViewContainerRef;

    @ViewChild('dynamicComponent', {static: false, read: ViewContainerRef})
    container: ViewContainerRef;

    @ViewChild('observacaoConteudo', {static: false, read: ElementRef})
    observacaoConteudo: ElementRef;

    @Input()
    displayedCampos: string[] = [
        'especieTarefa.nome',
        'setorResponsavel.nome',
        'dataHoraDistribuicao',
        'dataHoraPrazo',
        'observacao'
    ];

    isOpen: boolean;
    loadedAssuntos: boolean;
    loadedInteressados: boolean;

    pluginLoading = false;

    vinculacoesEtiquetas: VinculacaoEtiqueta[] = [];
    vinculacoesEtiquetasMinutas: VinculacaoEtiqueta[] = [];
    vinculacoesEtiquetasOficios: VinculacaoEtiqueta[] = [];

    constructor(
        private _dynamicService: DynamicService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _cdkTarefaListItemService: CdkTarefaListItemService
    ) {
        this.isOpen = false;
        this.loadedAssuntos = false;
        this.loadedInteressados = false;
        this.deleting = false;
        this.ciencia = false;
        this.selected = false;
        this.undeleting = false;
    }

    /**
     * On init
     */
    ngOnInit(): void {
        if (this.tarefa.processo?.assuntos?.length > 0) {
            this.isOpen = true;
            this.loadedAssuntos = true;
        }
        if (this.tarefa.processo?.interessados?.length > 0) {
            this.isOpen = true;
            this.loadedInteressados = true;
        }

        this._cdkTarefaListItemService.loading.subscribe((loading) => {
            this.pluginLoading = loading.indexOf(this.tarefa.id) > -1;
            this._changeDetectorRef.markForCheck();
        });

        this._cdkTarefaListItemService.remove.subscribe((tarefa: Tarefa) => {
            this.removeTarefa.emit(tarefa);
        });

        this.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas.filter(
            vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass !== 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        );

        this.vinculacoesEtiquetasMinutas = this.tarefa.vinculacoesEtiquetas.filter(
            vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
        );

        this.vinculacoesEtiquetasOficios = this.tarefa.vinculacoesEtiquetas.filter(
            vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\DocumentoAvulso'
        );
    }

    ngAfterViewInit(): void {
        const path = '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list-item';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(path)) {
                module.components[path].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            const componente: ComponentRef<HasTarefa> = this.container.createComponent(componentFactory);
                            componente.instance.setTarefa(this.tarefa);
                            this._changeDetectorRef.detectChanges();
                        });
                }));
            }
        });

        const pathItemText = '@cdk/components/tarefa/cdk-tarefa-list/cdk-tarefa-list-item#text';
        modulesConfig.forEach((module) => {
            if (module.components.hasOwnProperty(pathItemText)) {
                module.components[pathItemText].forEach(((c) => {
                    this._dynamicService.loadComponent(c)
                        .then((componentFactory) => {
                            const componente: ComponentRef<HasTarefa> = this.containerText.createComponent(componentFactory);
                            componente.instance.setTarefa(this.tarefa);
                            this._changeDetectorRef.detectChanges();
                        });
                }));
            }
        });
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes['tarefa']) {
            this._cdkTarefaListItemService.tarefa = this.tarefa;
            this.vinculacoesEtiquetasMinutas = this.tarefa.vinculacoesEtiquetas.filter(
                vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
            );
            this.vinculacoesEtiquetasOficios = this.tarefa.vinculacoesEtiquetas.filter(
                vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\DocumentoAvulso'
            );
            this.vinculacoesEtiquetas = this.tarefa.vinculacoesEtiquetas.filter(
                vinculacaoEtiqueta => vinculacaoEtiqueta.objectClass !== 'SuppCore\\AdministrativoBackend\\Entity\\Documento'
            );
        }
    }

    doDelete(): void {
        this.delete.emit(this.tarefa);
    }

    doMovimentar(): void {
        this.movimentar.emit(this.tarefa.id);
    }

    doCompartilhar(): void {
        this.compartilhar.emit(this.tarefa.id);
    }

    doCreateDocumentoAvulso(): void {
        this.createDocumentoAvulso.emit(this.tarefa.id);
    }

    doCreateTarefa(): void {
        this.createTarefa.emit({tarefaId: this.tarefa.id, processoId: this.tarefa.processo.id});
    }

    doEditTarefa(): void {
        this.editTarefa.emit(this.tarefa.id);
    }

    canAssinarMinutas(tarefa: Tarefa): boolean {
        return tarefa.vinculacoesEtiquetas.filter(vinculacao => vinculacao.objectClass === 'SuppCore\\AdministrativoBackend\\Entity\\Documento').length > 0;
    }

    doAssinaMinutas(): void {
        this.assinaMinutas.emit(this.tarefa);
    }

    doEditProcesso(): void {
        this.editProcesso.emit(this.tarefa);
    }

    doRedistribuirTarefa(): void {
        this.redistribuirTarefa.emit(this.tarefa.id);
    }

    doCienciaTarefa(): void {
        this.cienciaTarefa.emit(this.tarefa.id);
    }

    onSelectedChange(): void {
        this.toggleInSelectedTarefas.emit(this.tarefa.id);
    }

    doToggleUrgente(): void {
        this.toggleUrgente.emit(this.tarefa);
    }

    doRestauraTarefa(): void {
        this.restauraTarefa.emit(this.tarefa);
    }

    doEditarObservacao(): void {
        this.editandoObservacao = true;
        this._changeDetectorRef.detectChanges();
        setTimeout(()=> { // this will make the execution after the above boolean has changed
            this.observacaoConteudo.nativeElement.focus();
        },0);
        this.editarObservacao.emit();
    }

    doSalvarObservacao(tarefa, conteudo): void {
        this.salvarObservacao.emit({tarefa: tarefa, conteudo: conteudo});
    }

    doTogglePanel(): void {
        if (!this.loadedAssuntos) {
            this.loadAssuntos.emit(this.tarefa.processo.id);
        }
        if (!this.loadedInteressados) {
            this.loadInteressados.emit(this.tarefa.processo.id);
        }
        this.isOpen = !this.isOpen;
    }

    doClickEtiqueta(vinculacaoEtiqueta: VinculacaoEtiqueta, tarefa: Tarefa): void {
        this.etiquetaClickHandler.emit({vinculacaoEtiqueta, tarefa});
    }

    copiarParaAreaTrabalho(nup): void {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (nup));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }

    doVinculacaoEtiquetaCreate(etiqueta: Etiqueta): void {
        const operacaoId = CdkUtils.makeId();
        this.vinculacaoEtiquetaCreate.emit({
            tarefa: this.tarefa,
            etiqueta: etiqueta,
            operacaoId: operacaoId
        });
    }

    doVinculacaoEtiquetaDelete(vinculacaoEtiqueta: VinculacaoEtiqueta): void {
        this.vinculacaoEtiquetaDelete.emit({
            tarefaId: this.tarefa.id,
            vinculacaoEtiquetaId: vinculacaoEtiqueta.id
        });
    }

    doVinculacaoEtiquetaEdit(values): void {
        const vinculacaoEtiqueta = new VinculacaoEtiqueta();
        vinculacaoEtiqueta.id = values.id;
        this.vinculacaoEtiquetaEdit.emit({
            vinculacaoEtiqueta: vinculacaoEtiqueta,
            changes: {conteudo: values.conteudo, privada: values.privada}
        });
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(componenteDigital: ComponenteDigital): void {
        this.completed.emit(componenteDigital);
    }

    onCompleteAll(): void {
        this.completedAll.emit(this.tarefa.id);
    }

    onErroUpload(mensagem: string): void {
        this.erroUpload.emit(mensagem);
    }
}
