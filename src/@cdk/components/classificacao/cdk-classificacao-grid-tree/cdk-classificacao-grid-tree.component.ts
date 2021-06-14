import {FlatTreeControl} from '@angular/cdk/tree';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChildren
} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNode} from '@angular/material/tree';
import {ClassificacaoService} from '../../../services/classificacao.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CdkClassificacaoGridTreeService} from './services/cdk-classificacao-grid-tree.service';
import {FormBuilder} from '@angular/forms';
import {Classificacao, Pagination} from '../../../models';

@Component({
    selector: 'cdk-classificacao-grid-tree',
    templateUrl: './cdk-classificacao-grid-tree.component.html',
    styleUrls: ['./cdk-classificacao-grid-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkClassificacaoGridTreeComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @ViewChildren(MatTreeNode, {read: ElementRef}) treeNodes: ElementRef[];

    @Input()
    saving: boolean;

    @Output()
    cancel = new EventEmitter<any>();

    @Output()
    loading: boolean;

    @Output()
    selected = new EventEmitter<Classificacao>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _serviceTree: CdkClassificacaoGridTreeService,
        private _classificacaoService: ClassificacaoService,
        private _formBuilder: FormBuilder,
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<Classificacao>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    classificacaoMap = new Map<Classificacao, Classificacao>();
    nestedNodeMap = new Map<Classificacao, Classificacao>();
    treeControl: FlatTreeControl<Classificacao>;
    treeFlattener: MatTreeFlattener<Classificacao, Classificacao>;
    dataSource: MatTreeFlatDataSource<Classificacao, Classificacao>;

    getLevel = (node: Classificacao) => node.level;
    isExpandable = (node: Classificacao) => node.expandable;
    getChildren = (node: Classificacao): Classificacao[] => node.children;
    hasChild = (_: number, nodeData: Classificacao) => nodeData.hasChild === true;

    transformer = (node: Classificacao, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const classificacao = existingNode && existingNode.nome === node.nome
            ? existingNode
            : new Classificacao();

        Object.entries(node).forEach(
            ([key, value]) => {
                classificacao[key] = value;
            }
        );

        classificacao.level = level;
        classificacao.expandable = !!node.children;

        this.classificacaoMap.set(classificacao, node);
        this.nestedNodeMap.set(node, classificacao);
        return classificacao;
    };
    ngOnInit(): void {
        this.initTree();
        this._serviceTree.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    addNewItem(node: any): void {
        node.isLoading = true;
        const parentNode = this.classificacaoMap.get(node);
        const classificacaoesChild = this.getClassificacao('eq:' + node.id);
        classificacaoesChild.subscribe((classificacaoes) => {
            const data = this.montarArrayClassificacao(classificacaoes);
            this._serviceTree.insertItem(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /**
     * Inicializar o tree de classificacao com todos as classificacaoes pai.
     */
    initTree(): void {
        const classificacaoPai = this.getClassificacao('isNull');
        classificacaoPai.subscribe((classificacaoes) => {
            const data = this.montarArrayClassificacao(classificacaoes);
            this._serviceTree.initialize(data);
        });
    }

    montarArrayClassificacao(classificacaoes): any {
        const arrayClassificacaoes = [];
        classificacaoes.entities.forEach((value, indexItem) => {
            arrayClassificacaoes.push(value);
        });
        return arrayClassificacaoes;
    }

    getClassificacao(parent): Observable<any> {
        this.loading = true;
        const params = {
            filter: {
                'parent.id': parent
            },
            sort: {
                nome: 'ASC'
            },
            limit: 1000,
            offset: 0,
            populate: ['populateAll']
        };

        return this._classificacaoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate)
        ).pipe(
            finalize(() => {
                this.loading = false;
                this._changeDetectorRef.detectChanges();
            }),
            catchError(() => of([]))
        );

    }

    setInputClassificacao(node: Classificacao): void {
        this.selected.emit(node);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
