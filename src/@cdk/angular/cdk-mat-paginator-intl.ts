import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CdkMatPaginatorIntl extends MatPaginatorIntl {
    changes = new Subject<void>();
    firstPageLabel = 'Primeiro';
    itemsPerPageLabel = 'Registros por página';
    nextPageLabel = 'Seguinte';
    previousPageLabel = 'Anterior';
    lastPageLabel = 'Último';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0) {
            return `Página 1 de 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Página ${page + 1} de ${amountPages}`;
    }
}
