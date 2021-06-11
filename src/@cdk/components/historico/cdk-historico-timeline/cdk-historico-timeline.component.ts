import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Historico} from '@cdk/models';

@Component({
    selector     : 'cdk-historico-timeline',
    templateUrl  : './cdk-historico-timeline.component.html',
    styleUrls    : ['./cdk-historico-timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : cdkAnimations
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
