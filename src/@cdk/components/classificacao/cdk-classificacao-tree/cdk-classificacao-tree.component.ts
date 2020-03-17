import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {ClassificacaoService} from '../../../services/classificacao.service';
import {catchError, finalize} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {delayResponse} from 'angular-in-memory-web-api/delay-response';
import {Classificacao} from '../../../models';
import {detectBufferEncoding} from 'tslint/lib/utils';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export class ClassificacaoNode {
    id?: number;
    name: string;
    children?: ClassificacaoNode[];
}


const TREE_DATA: ClassificacaoNode[] = [
    {
        name: 'Fruit',
        children: [
            {name: 'Apple'},
            {name: 'Banana'},
            {name: 'Fruit loops'},
        ]
    }, {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [
                    {name: 'Broccoli'},
                    {name: 'Brussels sprouts'},
                ]
            }, {
                name: 'Orange',
                children: [
                    {name: 'Pumpkins'},
                    {name: 'Carrots'},
                ]
            },
        ]
    },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    id: number;
    level: number;
}

@Component({
    selector: 'cdk-classificacao-tree',
    templateUrl: './cdk-classificacao-tree.component.html',
    styleUrls: ['./cdk-classificacao-tree.component.scss']
})
export class CdkClassificacaoTreeComponent {

    loading: boolean;
    public classificacoes: ClassificacaoNode[] = [];


    private _transformer = (node: ClassificacaoNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            id: node.id,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


    constructor(
        private _classificacaoService: ClassificacaoService
    ) {
        this.initTree();
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    /**
     * Inicializar o tree de classificação com todos as classificações pai.
     */
    initTree(): void {
        const classificacaoPai = this.getClassificacao('isNull');
        classificacaoPai.subscribe(classificacoes => {
            this.setItemsClassificacao(classificacoes);
        });
    }

    setItemsClassificacao(classificacao: any): void {
        classificacao.entities.forEach((value, indexItem) => {
            const classificacaoItem = new ClassificacaoNode();
            classificacaoItem.id = value.id;
            classificacaoItem.name = value.nome;
            classificacaoItem.children = [
                {
                    name: 'Green',
                    children: [
                        {name: 'Broccoli'},
                        {name: 'Brussels sprouts'},
                    ]
                }, {
                    name: 'Orange',
                    children: [
                        {name: 'Pumpkins'},
                        {name: 'Carrots'},
                    ]
                },
            ];
            if (value.parent === null) {
                this.classificacoes.push(classificacaoItem);
                this.dataSource.data = this.classificacoes;
            } else {
                this.classificacoes.forEach((pai, index) => {
                    if (value.parent.id === pai.id) {
                        this.classificacoes[index].children[indexItem] = classificacaoItem;
                    }
                });
                this.dataSource.data = this.classificacoes;
            }
        });
    }

    openChild(node: any): void {
        const classificacaoChild = this.getClassificacao('eq:' + node.id);
        classificacaoChild.subscribe((classificacoes) => {
            this.setItemsClassificacao(classificacoes);
        });
    }

    getClassificacao(parent): Observable<any> {

        this.loading = true;

        const params = {
            filter: {
                parent: parent
            },
            sort: {
                nome: 'ASC'
            },
            limit: 1000,
            offset: 0,
            populate: [
                'populateAll'
            ]
        };

        return this._classificacaoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate)
        ).pipe(
            finalize(() => this.loading = false),
            catchError(() => of([]))
        );

    }
}
