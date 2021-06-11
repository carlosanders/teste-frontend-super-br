import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class AssuntoAdministrativoNode {
    id?: number;
    nome?: string;
    children?: AssuntoAdministrativoNode[];
    hasChild?: boolean;
    item?: string;
}

@Injectable()
export class CdkAssuntoAdministrativoTreeService {

    get data(): AssuntoAdministrativoNode[] {
        return this.dataChange.value;
    }

    dataChange = new BehaviorSubject<AssuntoAdministrativoNode[]>([]);
    treeData: any[] = [];

    initialize(classificacaoPai: AssuntoAdministrativoNode[]): void {
        const data = this.buildFileTree(classificacaoPai, 0);
        this.dataChange.next(data);
    }

    buildFileTree(obj: { [key: string]: any }, level: number): AssuntoAdministrativoNode[] {
        return Object.keys(obj).reduce<AssuntoAdministrativoNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new AssuntoAdministrativoNode();
            node.nome = value.nome;
            node.id = value.id;
            node.children = value.children;
            node.hasChild = value.hasChild;
            node.item = value.item;
            return accumulator.concat(node);
        }, []);
    }

    insertItem(parent: AssuntoAdministrativoNode, childrens: AssuntoAdministrativoNode[], add = false): void {
        if (parent.children) {
            parent.children = [];
            childrens.forEach((value) => {
                parent.children.push(value);
            });
            if (add == true) {
                parent.children.push({nome: ''});
            }
            this.dataChange.next(this.data);
            this.treeData = this.dataChange.getValue();
        }
    }

    insertChilds(parent: AssuntoAdministrativoNode, childrens: AssuntoAdministrativoNode[]): void {
        if (parent.children) {
            parent.children = [];
            childrens.forEach((value) => {
                parent.children.push(value);
            });

            this.dataChange.next(this.data);
            this.treeData = this.dataChange.getValue();
        }
    }

    updateItem(node: AssuntoAdministrativoNode, formValue, nodeDad: AssuntoAdministrativoNode = null) {
        node.nome = formValue.nome;
        this.dataChange.next(this.data);
    }


    public filter(filterText: string): void {
        if (this.dataChange.getValue().length < this.treeData.length) {
            this.dataChange.next(this.treeData);
        } else {
            this.treeData = this.dataChange.getValue();
        }

        let filteredTreeData;
        if (filterText) {
            filteredTreeData = this.treeData.filter(d => d.nome.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1);
            Object.assign([], filteredTreeData).forEach((ftd) => {
                let str = (ftd.nome);
                while (str.lastIndexOf('.') > -1) {
                    const index = str.lastIndexOf('.');
                    str = str.substring(0, index);
                    if (filteredTreeData.findIndex(t => t.nome === str) === -1) {
                        const obj = this.treeData.find(d => d.nome === str);
                        if (obj) {
                            filteredTreeData.push(obj);
                        }
                    }
                }
            });
        } else {
            filteredTreeData = this.treeData;
        }

        const data = this.buildFileTree(filteredTreeData, 0);
        this.dataChange.next(data);
    }
}
