import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Classificacao} from '../../../../models';

export class ClassificacaoNode {
    id?: number;
    name: string;
    classificacao?: Classificacao;
    children?: ClassificacaoNode[];
    hasChild: boolean;
}

@Injectable()
export class CdkClassificacaoTreeService {

    get data(): ClassificacaoNode[] {
        return this.dataChange.value;
    }
    dataChange = new BehaviorSubject<ClassificacaoNode[]>([]);
    treeData: any[] = [];


    initialize(classificacaoPai: ClassificacaoNode[]): void {
        const data = this.buildFileTree(classificacaoPai, 0);
        this.dataChange.next(data);
    }

    buildFileTree(obj: { [key: string]: any }, level: number): ClassificacaoNode[] {
        return Object.keys(obj).reduce<ClassificacaoNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new ClassificacaoNode();
            node.name = value.name;
            node.id = value.id;
            node.classificacao = value.classificacao;
            node.children = value.children;
            node.hasChild = value.hasChild;
            return accumulator.concat(node);
        }, []);
    }

    insertItem(parent: ClassificacaoNode, childrens: ClassificacaoNode[]): void {
        if (parent.children) {
            parent.children = [];
            childrens.forEach((value) => {
                parent.children.push(value);
            });

            this.dataChange.next(this.data);
            this.treeData = this.dataChange.getValue();
        }
    }




    public filter(filterText: string): void {
        if (this.dataChange.getValue().length < this.treeData.length) {
            this.dataChange.next(this.treeData);
        } else {
            this.treeData = this.dataChange.getValue();
        }

        let filteredTreeData;
        if (filterText) {
            filteredTreeData = this.treeData.filter(d => d.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
            Object.assign([], filteredTreeData).forEach((ftd) => {
                let str = (ftd.name);
                while (str.lastIndexOf('.') > -1) {
                    const index = str.lastIndexOf('.');
                    str = str.substring(0, index);
                    if (filteredTreeData.findIndex(t => t.name === str) === -1) {
                        const obj = this.treeData.find(d => d.name === str);
                        if (obj) {
                            filteredTreeData.push(obj);
                        }
                    }
                }
            });
        } else {
            filteredTreeData = this.treeData;
        }

        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        // file node as children.
        const data = this.buildFileTree(filteredTreeData, 0);
        // Notify the change.
        this.dataChange.next(data);
    }
}
