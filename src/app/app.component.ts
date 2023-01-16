import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service.service';
import { DynamicGrid } from './grid.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

      constructor(private backend: AppService) { }  

      dynamicArray: Array<DynamicGrid> = [];
      newDynamic: any = {}; 
      volumeUnitMap = new Map();
      temperatureUnitMap = new Map();

      INVALID = 'INVALID';
      INCORRECT = 'INCORRECT';
      CORRECT = 'CORRECT';

      VOLUME = 'volume';
      TEMPERATURE = 'temperature';

      ngOnInit(): void {  
        // load volume units
        this.volumeUnitMap.set('cubic-feet', 'CUBIC_FEET');
        this.volumeUnitMap.set('cubic-inches', 'CUBIC_INCH');
        this.volumeUnitMap.set('cups', 'CUP');
        this.volumeUnitMap.set('gallons', 'GALLON');
        this.volumeUnitMap.set('liters','LITER');
        this.volumeUnitMap.set('tablespoons','TABLE_SPOON');

        //load temperature units
        this.temperatureUnitMap.set('Celsius','CELSIUS');
        this.temperatureUnitMap.set('Fahrenheit','FAHRENHEIT');
        this.temperatureUnitMap.set('Kelvin','KELVIN');
        this.temperatureUnitMap.set('Rankine','RANKINE');

        this.addDefaultRow();
        console.log(this.newDynamic);
      }  

      addRow() {    
        this.newDynamic = {name: "", email: "",phone:""};  
          this.dynamicArray.push(this.newDynamic);  
          console.log(this.dynamicArray);  
          return true;  
      }

      validate(index: number) {
        let inputType = null;
        let inputUnit = null;
        let targetUnit = null;
        if (this.volumeUnitMap.get(this.dynamicArray[index].inputUnit.trim()) != null &&
            this.volumeUnitMap.get(this.dynamicArray[index].targetUnit.trim()) != null) {
          inputType = this.VOLUME;
          inputUnit = this.volumeUnitMap.get(this.dynamicArray[index].inputUnit.trim());
          targetUnit = this.volumeUnitMap.get(this.dynamicArray[index].targetUnit.trim());
        } else if (this.temperatureUnitMap.get(this.dynamicArray[index].inputUnit.trim()) != null &&
              this.temperatureUnitMap.get(this.dynamicArray[index].targetUnit.trim()) != null) {
          inputType = this.TEMPERATURE;
          inputUnit = this.temperatureUnitMap.get(this.dynamicArray[index].inputUnit.trim());
          targetUnit = this.temperatureUnitMap.get(this.dynamicArray[index].targetUnit.trim());
        }

        if (inputType === null) {
          this.dynamicArray[index].result = this.INVALID;
          console.log("unknown property", inputType);
        } else {
          this.backend.getResult(inputType, inputUnit, targetUnit, this.dynamicArray[index].inputValue)
          .subscribe(
            (response) => {
              let roundOfResult = Math.round(10 * Number(response)) / 10;
              let roundOfStudentResponse = Math.round(10 * Number(this.dynamicArray[index].studentResponse)) / 10;
                if (roundOfResult === roundOfStudentResponse) {
                  this.dynamicArray[index].result = this.CORRECT;
                }
                else {
                  this.dynamicArray[index].result = this.INCORRECT;
                }
              console.log('got the reponse from API', response);
          },
          (error) => {                              //error() callback
            console.error('Request failed with error', error);
          });
        }
      }

      deleteRow(index: number) {  
        this.dynamicArray.splice(index, 1);  
          if(this.dynamicArray.length == 0) {  
            this.addDefaultRow();
          }  
          return true;
      }

      addDefaultRow() {
        this.newDynamic = {inputValue: "", inputUnit: "", targetUnit: "", studentResponse: "", result: ""};  
        this.dynamicArray.push(this.newDynamic);
      }
} 