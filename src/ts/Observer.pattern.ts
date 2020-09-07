"use strict"; 
// https://frontand.ru/observer-javascript-design-patterns-part-6-1/

(function($) {
  let controlCheckbox: JQuery<HTMLInputElement> | null = $('.mainCheckbox');
  let addBtn:  JQuery<HTMLButtonElement> | null = $('.addNewObserver');
  let container:  JQuery<HTMLElement> | null = $('.observersContainer');

  class Observer {
    constructor() {}
    // count() {
    //   return this.observerList.length;
    // }
  }
  
  class Subject extends Observer implements listSubject<setUpdate> {
    public observerList: any[] = [];
    constructor() {
      super();
    }

    add(obj: setUpdate): void {
      this.observerList.push(obj);
    }

    get(index: number): HTMLElement | null {
      if ( index > -1 && index < this.observerList.length ) {
        return this.observerList[index];
      }
      return null;
    }
    notify(context:HTMLElement) {
      for(var i = 0, len = this.observerList.length; i < len; i++) {
        let check = this.observerList[i];
        check.update = context;
      }
    }
  }

  let subject = new Subject();
  controlCheckbox.on('click', function(){
    if ( controlCheckbox ) {
      subject.notify( controlCheckbox.prop('checked') );
    }
  });
  if ( addBtn ) {
    addBtn.on('click', addNewObserver);
  }

  function addNewObserver() {
    var check = <setUpdate>$('<input type="checkbox">');
    Object.defineProperty(check, 'update', {
      set(value: string) {
        this.get(0).checked = value;
      }
    });
    subject.add(check);
    if ( container ) {
      container.append(check);
    }
  }

})(jQuery);