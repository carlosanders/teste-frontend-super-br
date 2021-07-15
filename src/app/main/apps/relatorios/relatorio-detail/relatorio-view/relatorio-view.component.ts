import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SecurityContext,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {CdkPerfectScrollbarDirective} from '@cdk/directives/cdk-perfect-scrollbar/cdk-perfect-scrollbar.directive';

import {RelatorioService} from '@cdk/services/relatorio.service';
import {Relatorio} from '@cdk/models/relatorio.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {ComponenteDigital} from '@cdk/models';
import {getRouterState} from '../../../../../store';

@Component({
    selector: 'relatorio-view',
    templateUrl: './relatorio-view.component.html',
    styleUrls: ['./relatorio-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelatorioViewComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();
    binary$: Observable<any>;

    relatorio$: Observable<Relatorio>;
    relatorio: Relatorio;

    @ViewChildren(CdkPerfectScrollbarDirective)
    cdkScrollbarDirectives: QueryList<CdkPerfectScrollbarDirective>;

    fileName = '';

    src: any;
    loading = false;

    routerState: any;
    routerState$: Observable<any>;

    chaveAcesso: string;

    @Output()
    select: EventEmitter<ComponenteDigital> = new EventEmitter();

    /**
     *
     * @param _relatorioService
     * @param _changeDetectorRef
     * @param _componenteDigitalService
     * @param _sanitizer
     * @param _store
     */
    constructor(
        private _relatorioService: RelatorioService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _componenteDigitalService: ComponenteDigitalService,
        private _sanitizer: DomSanitizer,
        private _store: Store<fromStore.RelatorioViewAppState>
    ) {
        this.binary$ = this._store.pipe(select(fromStore.getBinary));

        this.relatorio$ = this._store.pipe(select(fromStore.getRelatorio));
        this.routerState$ = this._store.pipe(select(getRouterState));
        this.relatorio$.pipe(
            filter(relatorio => !!relatorio)
        ).subscribe((relatorio) => {
            this.relatorio = relatorio;
        });

        this.binary$.subscribe(
            (binary) => {
                if (binary.src && binary.src.conteudo) {
                    const byteCharacters = atob(binary.src.conteudo.split(';base64,')[1]);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {type: binary.src.mimetype});
                    const URL = window.URL;
                    if (binary.src.mimetype === 'application/pdf' || binary.src.mimetype === 'text/html') {
                        this.src = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                    } else {
                        const downloadUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
                        const downloadLink = document.createElement('a');
                        const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, downloadUrl);
                        downloadLink.target = '_blank';
                        downloadLink.href = sanitizedUrl;
                        downloadLink.download = binary.src.fileName;
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        setTimeout(() => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                            window.URL.revokeObjectURL(sanitizedUrl);
                        }, 100);
                        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');
                    }

                    this.fileName = binary.src.fileName;
                    this.select.emit(binary.src);
                } else {
                    this.fileName = '';
                    this.src = false;
                }
                this.loading = binary.loading;
                this._changeDetectorRef.markForCheck();
            }
        );

        this.src = this._sanitizer.bypassSecurityTrustResourceUrl('about:blank');

    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState)
            ).subscribe((routerState) => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

    }

    ngOnDestroy(): void {
        this._changeDetectorRef.detach();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadRelatorio({reset: true}));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
