import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {topicosConfig} from './topicos-config';
import {Topico} from './topico';
import { CdkUtils } from '@cdk/utils';
import {DynamicService} from '../modules/dynamic.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ajuda',
    templateUrl: './ajuda.component.html',
    styleUrls: ['./ajuda.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AjudaComponent implements OnInit {

    form: FormGroup;

    topicos: Topico[] = [];
    resultado: Topico[] = [];

    @ViewChild('container', { read: ElementRef, static: false })
    container: ElementRef;

    card = 'form';
    titulo = '';

    isSubmited = false;

    current: any;
    context: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _dynamicService: DynamicService,
        private _router: Router,
    ) {

        this.form = this._formBuilder.group({
            pesquisa: [null, [Validators.required, Validators.maxLength(255)]],
        });

        this._router.events.subscribe(
            (next) => {
                this.context = next;
                // if(this.context.url){
                //     this.resultado = CdkUtils.filterArrayByString(this.topicos, this.context.url.split("/", 3)[2]);
                // }
            }
        );
    }

    ngOnInit(): void {
        this.topicos = topicosConfig;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    pesquisar(): void {
        this.back();
        this.isSubmited = true;
        this.resultado = CdkUtils.filterArrayByString(this.topicos, this.form.get('pesquisa').value);
    }

    carregar(topico: Topico): void {
        this.card = 'modulo';
        this.titulo = topico.titulo; 
        this._dynamicService.loadComponent(topico.module)
            .then(({ host }) => {
                this.current = host;
                return this.containerElement.appendChild(host);
            });
    }

    back(): void {
        this.card = 'form';
        if (this.current) {
            this.containerElement.removeChild(this.current);
            this.current = null;
        }
    }

    get containerElement(): HTMLElement {
        return this.container.nativeElement;
    }
}
