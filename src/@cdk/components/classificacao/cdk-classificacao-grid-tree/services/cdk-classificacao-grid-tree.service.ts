import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Classificacao} from '../../../../models';

@Injectable()
export class CdkClassificacaoGridTreeService {

    get data(): Classificacao[] {
        return this.dataChange.value;
    }
    dataChange = new BehaviorSubject<Classificacao[]>([]);
    treeData: any[] = [];


    initialize(classificacaoPai: Classificacao[]): void {
        const data = this.buildFileTree(classificacaoPai, 0);
        this.dataChange.next(data);
    }

    buildFileTree(obj: { [key: string]: any }, level: number): Classificacao[] {
        return Object.keys(obj).reduce<Classificacao[]>((accumulator, key) => {
            const value = obj[key];
            return accumulator.concat(value);
        }, []);
    }

    insertItem(parent: Classificacao, childrens: Classificacao[]): void {
        parent.children = [];
        childrens.forEach((value) => {
            parent.children.push(value);
        });

        this.dataChange.next(this.data);
        this.treeData = this.dataChange.getValue();
    }
}
