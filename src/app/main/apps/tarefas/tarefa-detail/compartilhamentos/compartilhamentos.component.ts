import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'compartilhamentos',
    templateUrl: './compartilhamentos.component.html',
    styleUrls: ['./compartilhamentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CompartilhamentosComponent {

}
