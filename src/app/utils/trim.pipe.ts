import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  
  private forbiddenChars: string[] = [',', '.'];

  transform(string: string, limit: number = 50, ellipsis: string = '...'): any {
    const strippedString = this.stripHTMLTags(string);
    let limitedString = strippedString.split(' ').slice(0, limit).join(' ');
    if (this.endsWithForbiddenChar(limitedString)) {
      limitedString = limitedString.slice(0, -1);
    }
    return `${limitedString}${ellipsis}`;
  }
  private stripHTMLTags(string: string): string {
    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = string;
    return tmpDiv.textContent;
  }
  private endsWithForbiddenChar(string: string): boolean {
    return this.forbiddenChars.includes(string.slice(-1));
  }
}