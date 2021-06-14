import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class ClassificacaoNode {
    id?: number;
    nome?: string;
    codigo?: string;
    children?: ClassificacaoNode[];
    hasChild?: boolean;
    item?: string;
}

@Injectable()
export class CdkClassificacaoTreeFormService {

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
            node.nome = value.nome;
            node.codigo = value.codigo;
            node.id = value.id;
            node.children = value.children;
            node.hasChild = value.hasChild;
            node.item = value.item;
            return accumulator.concat(node);
        }, []);
    }

    insertItem(parent: ClassificacaoNode, childrens: ClassificacaoNode[], add = false): void {
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

    insertChilds(parent: ClassificacaoNode, childrens: ClassificacaoNode[]): void {
        if (parent.children) {
            parent.children = [];
            childrens.forEach((value) => {
                parent.children.push(value);
            });

            this.dataChange.next(this.data);
            this.treeData = this.dataChange.getValue();
        }
    }

    updateItem(node: ClassificacaoNode, formValue, nodeDad: ClassificacaoNode = null) {
        node.nome = formValue.nome;
        node.codigo = formValue.codigo;
        this.dataChange.next(this.data);
    }

}
