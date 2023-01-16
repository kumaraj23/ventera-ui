export class DynamicGrid{     
    inputValue: number;  
    inputUnit: string;  
    targetUnit: string;  
    studentResponse: number;  
    result: string

    constructor(inputValue: number, 
        inputUnit: string, 
        targetUnit: string,
        studentResponse: number,
        result: string) {
        this.inputValue = inputValue;
        this.inputUnit = inputUnit;
        this.targetUnit = targetUnit;
        this.studentResponse = studentResponse;
        this.result = result;
    }
}