import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkSidebarService} from '../../../sidebar/sidebar.service';

@Component({
    selector: 'cdk-logentry-filter',
    templateUrl: './cdk-logentry-filter.component.html',
    styleUrls: ['./cdk-logentry-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLogentryFilterComponent {

    @Output()
    selected = new EventEmitter<any>();

    form: FormGroup;

    @Input()
    mode = 'list';

    constructor(
        private _formBuilder: FormBuilder,
        private _cdkSidebarService: CdkSidebarService,
    ) {
        this.form = this._formBuilder.group({
            action: [null],
            objectId: [null],
            loggedAt: [null],
            objectClass: [null],
            valor: [null],
            username: [null],
        });
    }

    emite(): void {
        if (!this.form.valid) {
            return;
        }

        const andXFilter = [];

        if (this.form.get('action').value) {
            this.form.get('action').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'action': `like:%${bit}%`});
            });
        }

        if (this.form.get('objectId').value) {
            this.form.get('objectId').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'objectId': `like:%${bit}%`});
            });
        }

        if (this.form.get('loggedAt').value) {
            this.form.get('loggedAt').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'loggedAt': `like:%${bit}%`});
            });
        }

        if (this.form.get('objectClass').value) {
            this.form.get('objectClass').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'objectClass': `like:%${bit}%`});
            });
        }

        if (this.form.get('valor').value) {
            this.form.get('valor').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'valor': `like:%${bit}%`});
            });
        }

        if (this.form.get('username').value) {
            this.form.get('username').value.split(' ').filter(bit => !!bit && bit.length >= 2).forEach((bit) => {
                andXFilter.push({'username': `like:%${bit}%`});
            });
        }

        if (this.form.get('loggedAt').value) {
            andXFilter.push({'loggedAt': `eq:${this.form.get('loggedAt').value}`});
        }

        const request = {
            filters: {},
        };

        if (Object.keys(andXFilter).length) {
            request['filters']['andX'] = andXFilter;
        }

        this.selected.emit(request);
        this._cdkSidebarService.getSidebar('cdk-logentry-filter').close();
    }

    verificarValor(objeto): void {
        const objetoForm = this.form.get(objeto.target.getAttribute('formControlName'));
        if (!objetoForm.value || typeof objetoForm.value !== 'object') {
            objetoForm.setValue(null);
        }
    }

    buscar(): void {
        this.emite();
    }

    limpar(): void {
        this.form.reset();
        this.emite();
    }
}
