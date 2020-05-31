import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Setor} from '../../../../models';

@Injectable()
export class CdkSetorTreeService {

    get data(): Setor[] {
        return this.dataChange.value;
    }
    dataChange = new BehaviorSubject<Setor[]>([]);
    treeData: any[] = [];


    initialize(setorPai: Setor[]): void {
        const data = this.buildFileTree(setorPai, 0);
        this.dataChange.next(data);
    }

    buildFileTree(obj: { [key: string]: any }, level: number): Setor[] {
        return Object.keys(obj).reduce<Setor[]>((accumulator, key) => {
            const value = obj[key];
            return accumulator.concat(value);
        }, []);
    }

    insertItem(parent: Setor, childrens: Setor[]): void {
        parent.children = [];
        childrens.forEach((value) => {
            parent.children.push(value);
        });

        this.dataChange.next(this.data);
        this.treeData = this.dataChange.getValue();
    }
}
