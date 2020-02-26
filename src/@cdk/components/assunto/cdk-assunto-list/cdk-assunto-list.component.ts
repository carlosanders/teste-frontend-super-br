import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {Assunto} from '@cdk/models/assunto.model';
import {Processo} from '@cdk/models/processo.model';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

@Component({
    selector: 'cdk-assunto-list',
    templateUrl: './cdk-assunto-list.component.html',
    styleUrls: ['./cdk-assunto-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    exportAs: 'dragTarefaList'
})
export class CdkAssuntoListComponent implements AfterViewInit, OnInit, OnChanges {

   
    @Input()
    assuntos: Assunto[] = [];

    @Output()
    openPanel = new EventEmitter();

    @Output()
    closePanel = new EventEmitter();


    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseSidebarService: FuseSidebarService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    doOpenPanel(): void {

    }

    doClosePanel(): void {
        
    }
}
