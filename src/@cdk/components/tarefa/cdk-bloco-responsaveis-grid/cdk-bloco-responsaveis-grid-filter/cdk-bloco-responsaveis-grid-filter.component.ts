import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    OnInit, Output,
    ViewEncapsulation
  } from '@angular/core';
  
  import {cdkAnimations} from '@cdk/animations';
  import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'cdk-bloco-responsaveis-grid-filter',
  templateUrl: './cdk-bloco-responsaveis-grid-filter.component.html',
  styleUrls: ['./cdk-bloco-responsaveis-grid-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: cdkAnimations
})
export class CdkBlocoResponsaveisGridFilterComponent implements OnInit {
  
  @Output()
  selected = new EventEmitter<any>();

  form: FormGroup;

  filters: any = {};

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder
  ) {

      this.form = this._formBuilder.group({
         
          responsavel: [null],
          setor: [null],
          sigla: [null],

      });


  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

      this.form.get('responsavel').valueChanges.subscribe(value => {
          if (value !== null) {
              this.filters = {
                  ...this.filters,
                  responsavel: `like:${value}%`
              };
              this.selected.emit(this.filters);
          }
      });
      
      this.form.get('setor').valueChanges.subscribe(value => {
        if (value !== null) {
            this.filters = {
                ...this.filters,
                setor: `like:${value}%`
            };
            this.selected.emit(this.filters);
        }
      });      

      this.form.get('sigla').valueChanges.subscribe(value => {
          if (value !== null) {
              this.filters = {
                  ...this.filters,
                  sigla: `like:${value}%`
              };
              this.selected.emit(this.filters);
          }
      });
  }

  limpar(): void {
      this.filters = {};
      this.selected.emit(this.filters);
      this.form.reset();
  }

}

