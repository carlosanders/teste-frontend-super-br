import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'atividades',
    templateUrl: './atividades.component.html',
    styleUrls: ['./atividades.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadesComponent {

}
