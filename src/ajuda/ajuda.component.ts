import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {topicosConfig} from './topicos-config';
import {Topico} from './topico';
import {CdkUtils} from '@cdk/utils';
import {DynamicService} from '../modules/dynamic.service';
import {Router} from '@angular/router';

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

    @ViewChild('container', {static: true, read: ViewContainerRef}) container: ViewContainerRef;

    card = 'form';
    titulo = '';
    email = 'sapiens.agu.gov.br'; //INDICAR AQUI O EMAIL UTILIZADO PELO SUPORTE DO SISTEMA
    wiki = "http://sapienswiki.agu.gov.br/index.php/P%C3%A1gina_principal"; //INDICAR AQUI O WIKI UTILIZADO PELO SUPORTE DO SISTEMA
    
    isSubmited = false;

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
                if (this.context.url){
                    this.resultado = CdkUtils.filterArrayByString(this.topicos, this.context.url.split('/', 3)[2]);
                }
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
            .then(componentFactory => this.container.createComponent(componentFactory));
    }

    back(): void {
        this.card = 'form';
        this.container.clear();
    }
}
