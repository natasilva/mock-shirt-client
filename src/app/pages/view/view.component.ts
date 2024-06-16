import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationService } from '../../core/utils/navigation.service';
import { EstimateItensComponent } from '../../components/estimate-itens/estimate-itens.component';
import { MatDialog } from '@angular/material/dialog';
import { FileService } from '../../core/utils/file.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SizeService } from '../../core/services/size.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  isPrinting: boolean = false;
  data: any = {};

  sizes$: Observable<any[]> | null = new Observable<any[]>()

  estimateForm: FormGroup;
  shirtForm: FormGroup;
  quantity: number = 1;

  front_url: string = ''
  back_url: string = ''
  is_front: boolean = true

  constructor(
    private navigationService: NavigationService,
    private sizeService: SizeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private fileService: FileService,
  ) {
    this.estimateForm = this.formBuilder.group({
      quantity: [0, null],
      total_value: [0, null],
      material: [null, Validators.required],
      color: [null, Validators.required],
      shirts: this.formBuilder.array([]),
    });

    this.shirtForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_value: [0, Validators.required],
      original_value: [0, Validators.required],
      size: [null, Validators.required],
      collar: [null, Validators.required],
      sleeve: [null, Validators.required],
      img_url: [null, Validators.required],
      shirt: [null, Validators.required],
    });

    this.estimateForm.controls['shirts'].valueChanges.subscribe(val => {
      let quantity = val.reduce((acc: number, obj: any) => acc + obj.quantity, 0);
      let total_value = val.reduce((acc: number, obj: any) => acc + (obj.unit_value * obj.quantity), 0);

      this.estimateForm.patchValue({ quantity, total_value });
    });

    this.shirtForm.controls['shirt'].valueChanges.subscribe(shirt => {
      this.back_url = shirt.back
      this.front_url = shirt.front
      this.shirtForm.patchValue({
        img_url: shirt.front,
        collar: shirt.collar,
        sleeve: shirt.sleeve,
        unit_value: shirt.value,
        original_value: shirt.value,
      });

      this.setUnitValue()
    });

    this.shirtForm.controls['size'].valueChanges.subscribe(size => this.setUnitValue());
  }

  ngOnInit(): void {
    this.listSizes();

    if (history.state && history.state.data) {
      this.data = history.state.data;
      this.data.shirts = this.data.shirts.map((item: any) => ({
        ...item,
        front: this.base64ToUrl(item.front),
        back: this.base64ToUrl(item.back)
      }));

      this.estimateForm.patchValue({ color: this.data.color, material: this.data.material });
      this.cd.detectChanges();
    }
  }

  listSizes() {
    this.sizes$ = this.sizeService.list();
  }

  goToForm() {
    this.navigationService.navigate(["/form"]);
  }

  increaseQuantity() {
    this.quantity++;
    this.shirtForm.controls['quantity'].setValue(this.quantity);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.shirtForm.controls['quantity'].setValue(this.quantity);
    }
  }

  openlist() {
    this.dialog.open(EstimateItensComponent, {
      width: '1500px',
      data: this.estimateForm
    });
  }

  base64ToUrl(value: string): string {
    return this.fileService.base64ToUrl(value, 'image/png');
  }

  save() {
    if (this.shirtForm.valid) {
      let shirtData = this.shirtForm.getRawValue();
      delete shirtData.shirt;
      this.shirts.push(this.createShirt(shirtData));
      this.quantity = 1;
      this.shirtForm.reset(null, { emitEvent: false })
      this.shirtForm.patchValue({ quantity: this.quantity });
    }
  }

  createShirt(shirtData: any): FormGroup {
    return this.formBuilder.group({
      quantity: [shirtData.quantity, [Validators.required, Validators.min(1)]],
      unit_value: [shirtData.unit_value, Validators.required],
      original_value: [shirtData.original_value, Validators.required],
      size: [shirtData.size, Validators.required],
      collar: [shirtData.collar, Validators.required],
      sleeve: [shirtData.sleeve, Validators.required],
      img_url: [shirtData.img_url, Validators.required],
    });
  }

  get shirts(): FormArray {
    return this.estimateForm.get('shirts') as FormArray;
  }

  viewBack() {
    this.is_front = !this.is_front
  }

  setUnitValue(){
    const new_value = (this.shirtForm.controls['shirt'].value.value || 0) + (this.shirtForm.controls['size'].value?.value || 0)
    this.shirtForm.controls['unit_value'].setValue(new_value)
  }
}
