import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ModalidadeMeio} from '@cdk/models';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';

export class ModalidadeMeioDataSource implements DataSource<ModalidadeMeio> {

    private modalidadeMeioSubject = new BehaviorSubject<ModalidadeMeio[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private modalidadeMeioService: ModalidadeMeioService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<ModalidadeMeio[]> {
        return this.modalidadeMeioSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.modalidadeMeioSubject.complete();
        this.loadingSubject.complete();
    }

    load(filter = '{}', limit = 1, offset = 0, order = '{}', populate = '{}'): void {

        this.loadingSubject.next(true);

        this.modalidadeMeioService.query(
            filter,
            limit,
            offset,
            order,
            populate).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(response => this.modalidadeMeioSubject.next(response['entities']));
    }
}
