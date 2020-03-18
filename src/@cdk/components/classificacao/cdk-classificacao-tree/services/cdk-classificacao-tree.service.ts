import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ClassificacaoService} from '../../../../services/classificacao.service';
import {FlatNode} from '../cdk-classificacao-tree.component';

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


@Injectable()
export class CdkClassificacaoTreeService {
    dataChange = new BehaviorSubject<ClassificacaoNode[]>([]);

    get data(): ClassificacaoNode[] { return this.dataChange.value; }

    constructor(
    ) {
        // this.initialize();
    }

    initialize(classificacaoPai: ClassificacaoNode[]): void {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        debugger
        const data = this.buildFileTree(classificacaoPai, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: {[key: string]: any}, level: number): ClassificacaoNode[] {
        return Object.keys(obj).reduce<ClassificacaoNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new ClassificacaoNode();
            node.name = value.name;
            node.id = value.id;
            node.children = value.children;
            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: ClassificacaoNode, childrens: ClassificacaoNode[]): void {

        if (parent.children) {
            parent.children = [];
            childrens.forEach((value) => {
                parent.children.push(value);
            });

            this.dataChange.next(this.data);
        }
    }
}