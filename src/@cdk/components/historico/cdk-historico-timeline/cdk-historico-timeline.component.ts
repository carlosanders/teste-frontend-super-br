import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import {Historico} from '@cdk/models/historico.model';

@Component({
    selector     : 'cdk-historico-timeline',
    templateUrl  : './cdk-historico-timeline.component.html',
    styleUrls    : ['./cdk-historico-timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CdkHistoricoTimelineComponent implements OnInit, OnDestroy
{

    @Input()
    historicos: Historico[];

    @Input()
    isLoading: boolean;

    /**
     *
     */
    constructor(

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }
}
