import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'workflow-especies-processo',
    templateUrl: './especies-processo.component.html',
    styleUrls: ['./especies-processo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EspeciesProcessoComponent implements OnInit, OnDestroy {

    constructor(
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

}
