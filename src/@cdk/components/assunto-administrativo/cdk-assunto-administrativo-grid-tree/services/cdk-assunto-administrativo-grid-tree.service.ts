import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AssuntoAdministrativo} from '../../../../models';

@Injectable()
export class CdkAssuntoAdministrativoGridTreeService {

    get data(): AssuntoAdministrativo[] {
        return this.dataChange.value;
    }
    dataChange = new BehaviorSubject<AssuntoAdministrativo[]>([]);
    treeData: any[] = [];


    initialize(assuntoAdministrativoPai: AssuntoAdministrativo[]): void {
        const data = this.buildFileTree(assuntoAdministrativoPai, 0);
        this.dataChange.next(data);
    }

    buildFileTree(obj: { [key: string]: any }, level: number): AssuntoAdministrativo[] {
        return Object.keys(obj).reduce<AssuntoAdministrativo[]>((accumulator, key) => {
            const value = obj[key];
            return accumulator.concat(value);
        }, []);
    }

    insertItem(parent: AssuntoAdministrativo, childrens: AssuntoAdministrativo[]): void {
        parent.children = [];
        childrens.forEach((value) => {
            parent.children.push(value);
        });

        this.dataChange.next(this.data);
        this.treeData = this.dataChange.getValue();
    }
}
