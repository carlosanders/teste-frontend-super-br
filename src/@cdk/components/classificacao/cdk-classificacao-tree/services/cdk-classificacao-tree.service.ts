import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class ClassificacaoNode {
    id?: number;
    name: string;
    children?: ClassificacaoNode[];
}

@Injectable()
export class CdkClassificacaoTreeService {
    dataChange = new BehaviorSubject<ClassificacaoNode[]>([]);

    get data(): ClassificacaoNode[] { return this.dataChange.value; }

    initialize(classificacaoPai: ClassificacaoNode[]): void {
        const data = this.buildFileTree(classificacaoPai, 0);
        this.dataChange.next(data);
    }

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