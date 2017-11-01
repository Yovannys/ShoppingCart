import { ElementRef, Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomUsername]'
})
export class AppCustomUsernameDirective {

  // ElementRef hace referencia que se le pone la directiva
  constructor(private _element: ElementRef) {
    console.log(_element);
  }

  @HostListener('input',['$event'])
  onKeyDown(event: KeyboardEvent){
    const  input = event.target as HTMLInputElement;

    //capturar el valor
    const cleantext = input.value.trim();
    if (cleantext.length > 0){
      // Reemplazar espacios en blanco \s
      // de manera global (uno o muchos) /g
      input.value = cleantext.replace(/\s/g, '');

    }

  }

}
