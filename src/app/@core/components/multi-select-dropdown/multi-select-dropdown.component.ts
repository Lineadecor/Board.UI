import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownListItem} from "src/app/@core/data/models/dropdown-list-item";
@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent implements AfterViewInit{
  @Input() list: DropdownListItem[]; 
  @Input() checkedList : DropdownListItem[];   

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  
  currentSelected : {};
  showDropDown= false;
  selectedItemText= new Array<string>();
  isAllSelected= false;

constructor(private cd: ChangeDetectorRef) {
  this.checkedList = new Array<DropdownListItem>();
 }
  ngAfterViewInit(): void {
    this.checkedList.forEach(value=> this.selectedItemText.push(value.name));
    this.cd.detectChanges();
  }

     getSelectedValue(item: DropdownListItem){
      this.isAllSelected = false;
      if(item.checked){
        this.checkedList.push(item);  
        this.selectedItemText.push(item.name);
      }else{
          var index = this.checkedList.indexOf(item);
          this.checkedList.splice(index,1);
          this.selectedItemText.splice(index,1);
      }
      
      this.currentSelected = item;

      //share checked list
      this.shareCheckedlist();
      
      //share individual selected item
      this.shareIndividualStatus();
  }
  
  shareCheckedlist(){
       this.shareCheckedList.emit(this.checkedList);
  }
  
  shareIndividualStatus(){
      this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  selectAll(){
  
    this.checkedList = new Array<DropdownListItem>();
    this.selectedItemText = new Array<string>();

    if(this.isAllSelected) {
      this.list.forEach(value=>{ 
        this.checkedList.push({value: value.value, checked: true, name: value.name});
        this.selectedItemText.push(value.name);
        value.checked= true;
      });
    } else {
      this.list.forEach(value=> {
        this.checkedList.push({value: value.value, checked: false, name: value.name});
        value.checked=false;
      });
      this.shareCheckedlist();
   
      this.shareIndividualStatus();
    }
  }
}
