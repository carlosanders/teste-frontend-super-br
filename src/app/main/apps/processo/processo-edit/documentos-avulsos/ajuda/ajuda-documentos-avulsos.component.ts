import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'ajuda-documentos-avulsos',
    templateUrl: './ajuda-documentos-avulsos.component.html',
    styleUrls: ['./ajuda-documentos-avulsos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AjudaDocumentosAvulsosComponent {
    
    Collapsible(): void{
        let coll = document.getElementsByClassName('collapsible');
        let i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener('click', function() {
            this.classList.toggle('active');
            let content = this.nextElementSibling;
            if (content.style.display === 'block') {
            content.style.display = 'none';
            } else {
            content.style.display = 'block';
            }
            });
        } 
        }
}
