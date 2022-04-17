import { FormGroup } from "@angular/forms";

export class CustomValidators {
    
    static mustMatch(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if(matchingControl.errors && !matchingControl.errors.mustMatch){
                return;
            }
            if(control.value !== matchingControl.value) {
                matchingControl.setErrors({mustMatch: true});
            }
            else{
                matchingControl.setErrors(null);
            }
        }
    }
    static mustNotMatch(controlName: string, matchingControlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if(matchingControl.errors && !matchingControl.errors.mustMatch){
                return;
            }
            if(control.value === matchingControl.value) {
                matchingControl.setErrors({mustMatch: true});
            }
            else{
                matchingControl.setErrors(null);
            }
        }
    }
    static decadevCheck(controlName: string){
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            if(control.errors && !control.errors.decadevCheck){
                return;
            }
            var regexp = new RegExp('^[A-Za-z0-9._%+-]+@decagon.dev$');
            if(regexp.test(control.value) !== true) {
                control.setErrors({decadevCheck: true});
            }
            else{
                control.setErrors(null);
            }
        }
    }
}