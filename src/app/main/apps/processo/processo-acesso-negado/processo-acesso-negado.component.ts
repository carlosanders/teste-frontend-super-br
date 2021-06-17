import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'processo-acesso-negado',
    templateUrl: './processo-acesso-negado.component.html',
    styleUrls: ['./processo-acesso-negado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ProcessoAcessoNegadoComponent {

}
