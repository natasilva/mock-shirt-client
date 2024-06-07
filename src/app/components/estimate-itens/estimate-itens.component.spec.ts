import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstimateItensComponent } from '../../components/estimate-itens/estimate-itens.component'; 

describe('EstimateItensComponent', () => {
  let component: EstimateItensComponent;
  let fixture: ComponentFixture<EstimateItensComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimateItensComponent] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstimateItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
