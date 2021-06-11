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
import {AssuntoAdministrativoService} from '../../../services/assunto-administrativo.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CdkAssuntoAdministrativoGridTreeService} from './services/cdk-assunto-administrativo-grid-tree.service';
import {FormBuilder} from '@angular/forms';
import {AssuntoAdministrativo, Pagination} from '../../../models';

@Component({
    selector: 'cdk-assunto-administrativo-grid-tree',
    templateUrl: './cdk-assunto-administrativo-grid-tree.component.html',
    styleUrls: ['./cdk-assunto-administrativo-grid-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkAssuntoAdministrativoGridTreeComponent implements OnInit {

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
    selected = new EventEmitter<AssuntoAdministrativo>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _serviceTree: CdkAssuntoAdministrativoGridTreeService,
        private _assuntoAdministrativoService: AssuntoAdministrativoService,
        private _formBuilder: FormBuilder,
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<AssuntoAdministrativo>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    assuntoAdministrativoMap = new Map<AssuntoAdministrativo, AssuntoAdministrativo>();
    nestedNodeMap = new Map<AssuntoAdministrativo, AssuntoAdministrativo>();
    treeControl: FlatTreeControl<AssuntoAdministrativo>;
    treeFlattener: MatTreeFlattener<AssuntoAdministrativo, AssuntoAdministrativo>;
    dataSource: MatTreeFlatDataSource<AssuntoAdministrativo, AssuntoAdministrativo>;

    getLevel = (node: AssuntoAdministrativo) => node.level;
    isExpandable = (node: AssuntoAdministrativo) => node.expandable;
    getChildren = (node: AssuntoAdministrativo): AssuntoAdministrativo[] => node.children;
    hasChild = (_: number, nodeData: AssuntoAdministrativo) => nodeData.hasChild === true;

    transformer = (node: AssuntoAdministrativo, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const assuntoAdministrativo = existingNode && existingNode.nome === node.nome
            ? existingNode
            : new AssuntoAdministrativo();

        Object.entries(node).forEach(
            ([key, value]) => {
                assuntoAdministrativo[key] = value;
            }
        );

        assuntoAdministrativo.level = level;
        assuntoAdministrativo.expandable = !!node.children;

        this.assuntoAdministrativoMap.set(assuntoAdministrativo, node);
        this.nestedNodeMap.set(node, assuntoAdministrativo);
        return assuntoAdministrativo;
    };
    ngOnInit(): void {
        this.initTree();
        this._serviceTree.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    addNewItem(node: any): void {
        node.isLoading = true;
        const parentNode = this.assuntoAdministrativoMap.get(node);
        const assuntoAdministrativoesChild = this.getAssuntoAdministrativo('eq:' + node.id);
        assuntoAdministrativoesChild.subscribe((assuntoAdministrativoes) => {
            const data = this.montarArrayAssuntoAdministrativo(assuntoAdministrativoes);
            this._serviceTree.insertItem(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /**
     * Inicializar o tree de assuntoAdministrativo com todos as assuntoAdministrativoes pai.
     */
    initTree(): void {
        const assuntoAdministrativoPai = this.getAssuntoAdministrativo('isNull');
        assuntoAdministrativoPai.subscribe((assuntoAdministrativoes) => {
            const data = this.montarArrayAssuntoAdministrativo(assuntoAdministrativoes);
            this._serviceTree.initialize(data);
        });
    }

    montarArrayAssuntoAdministrativo(assuntoAdministrativoes): any {
        const arrayAssuntoAdministrativoes = [];
        assuntoAdministrativoes.entities.forEach((value, indexItem) => {
            arrayAssuntoAdministrativoes.push(value);
        });
        return arrayAssuntoAdministrativoes;
    }

    getAssuntoAdministrativo(parent): Observable<any> {
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

        return this._assuntoAdministrativoService.query(
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

    setInputAssuntoAdministrativo(node: AssuntoAdministrativo): void {
        this.selected.emit(node);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
