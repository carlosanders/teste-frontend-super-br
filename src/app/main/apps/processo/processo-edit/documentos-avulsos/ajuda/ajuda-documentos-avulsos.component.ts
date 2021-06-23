import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'ajuda-documentos-avulsos',
    templateUrl: './ajuda-documentos-avulsos.component.html',
    styleUrls: ['./ajuda-documentos-avulsos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AjudaDocumentosAvulsosComponent {

    Collapsible(): void{
        const coll = document.getElementsByClassName('collapsible');
        let i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
            content.style.display = 'none';
            } else {
            content.style.display = 'block';
            }
            });
        }
        }
}
