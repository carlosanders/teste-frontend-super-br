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
import {SetorService} from '../../../services/setor.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CdkSetorTreeService} from './services/cdk-setor-tree.service';
import {FormBuilder} from '@angular/forms';
import {Pagination, Setor} from '../../../models';

@Component({
    selector: 'cdk-setor-tree',
    templateUrl: './cdk-setor-tree.component.html',
    styleUrls: ['./cdk-setor-tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdkSetorTreeComponent implements OnInit {

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
    selected = new EventEmitter<Setor>();

    setorMap = new Map<Setor, Setor>();
    nestedNodeMap = new Map<Setor, Setor>();
    treeControl: FlatTreeControl<Setor>;
    treeFlattener: MatTreeFlattener<Setor, Setor>;
    dataSource: MatTreeFlatDataSource<Setor, Setor>;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _serviceTree: CdkSetorTreeService,
        private _setorService: SetorService,
        private _formBuilder: FormBuilder,
    ) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<Setor>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.pagination = new Pagination();
    }

    getLevel = (node: Setor) => node.level;
    isExpandable = (node: Setor) => node.expandable;
    getChildren = (node: Setor): Setor[] => node.children;
    hasChild = (_: number, nodeData: Setor) => nodeData.hasChild === true;

    transformer = (node: Setor, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const setor = existingNode && existingNode.nome === node.nome
            ? existingNode
            : new Setor();

        Object.entries(node).forEach(
            ([key, value]) => {
                setor[key] = value;
            }
        );

        setor.level = level;
        setor.expandable = !!node.children;

        this.setorMap.set(setor, node);
        this.nestedNodeMap.set(node, setor);
        return setor;
    };

    ngOnInit(): void {
        this.initTree();
        this._serviceTree.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    addNewItem(node: any): void {
        node.isLoading = true;
        this.pagination.filter = {};
        const parentNode = this.setorMap.get(node);
        const setoresChild = this.getSetor('eq:' + node.id);
        setoresChild.subscribe((setores) => {
            const data = this.montarArraySetor(setores);
            this._serviceTree.insertItem(parentNode, data);
            this.treeControl.expand(node);
            node.isLoading = false;
        });
    }

    /**
     * Inicializar o tree de setor com todos as setores pai.
     */
    initTree(): void {
        const setorPai = this.getSetor('isNull');
        setorPai.subscribe((setores) => {
            const data = this.montarArraySetor(setores);
            this._serviceTree.initialize(data);
        });
    }

    montarArraySetor(setores): any {
        const arraySetores = [];
        setores.entities.forEach((value, indexItem) => {
            arraySetores.push(value);
        });
        return arraySetores;
    }

    getSetor(parent): Observable<any> {
        this.loading = true;
        const params = {
            filter: {
                ...this.pagination.filter,
                'parent.id': parent
            },
            sort: {
                nome: 'ASC'
            },
            limit: 1000,
            offset: 0,
            populate: ['populateAll']
        };

        return this._setorService.query(
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

    setInputSetor(node: Setor): void {
        this.selected.emit(node);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
