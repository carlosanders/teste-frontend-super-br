import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-assuntos',
    templateUrl: './ajuda-assuntos.component.html',
    styleUrls: ['./ajuda-assuntos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaAssuntosComponent {
}
