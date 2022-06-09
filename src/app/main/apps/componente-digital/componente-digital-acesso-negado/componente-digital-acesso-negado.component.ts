import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'componente-digital-acesso-negado',
    templateUrl: './componente-digital-acesso-negado.component.html',
    styleUrls: ['./componente-digital-acesso-negado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ComponenteDigitalAcessoNegadoComponent {

}
