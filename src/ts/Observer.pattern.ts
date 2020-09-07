"use strict"; 
// https://frontand.ru/observer-javascript-design-patterns-part-6-1/

(function($) {
  let controlCheckbox: JQuery<HTMLInputElement> | null = $('.mainCheckbox');
  let addBtn:  JQuery<HTMLButtonElement> | null = $('.addNewObserver');
  let container:  JQuery<HTMLElement> | null = $('.observersContainer');

  interface ListCheckbox {
    elem: JQuery<HTMLInputElement>,
    value: boolean
  }
  // interface setUpdate extends JQuery<HTMLElement> {
  //   update?: typingFunction<string>
  // }
  

  interface listSubject<T> {
    // addObserver(key: string, fn: setUpdate): void,
    // getObserver(index: number): HTMLElement | null,
    // notify(context: HTMLElement): void
  }
  type typingFunction<C> = (value: C) => void;

  type EventMap = Record<string, any>; // { data: string } => true, {x: string} => true
  type EventKey<T extends EventMap> = string & keyof T;

  class Subject<T extends EventMap> implements listSubject<T> {
    public observerList: {
      [K in keyof EventMap]?: Array<(p: EventMap[K]) => void>
    } = {};
    addObserver<K extends EventKey<T>>(key: K, fn: typingFunction<T[K]>): void {
      this.observerList[key] = (this.observerList[key] || []).concat(fn);
    }
    offObserver<K extends EventKey<T>>(key: K, fn: typingFunction<T[K]>): void {
      this.observerList[key] = (this.observerList[key] || []).filter( (f: typingFunction<T[K]>) => f !== fn);
    }
    notify<K extends EventKey<T>>(key: K, data: T[K]): void {
      (this.observerList[key] || []).forEach(function(fn: typingFunction<T[K]>) {
        fn(data);
      });
    }
  }

  let subject = new Subject<{ setCheckbox: ListCheckbox }>();
  subject.addObserver('setCheckbox', ({ elem, value }) => setCheckbox({ elem, value }));
  
  function setCheckbox(params: ListCheckbox): void {
    params.elem.get(0).checked = params.value;
  }
  function updateCheckbox() {
    $('.observer').each((i, element) => {
      if ( controlCheckbox ) {
        subject.notify('setCheckbox', { elem: $(element), value: controlCheckbox.prop('checked') } as ListCheckbox )
      }
    });
  }

  if ( controlCheckbox ) {
    controlCheckbox.on('click', updateCheckbox);
  }
  if ( addBtn ) {
    addBtn.on('click', addNewObserver);
  }

  function addNewObserver() {
    var check = $('<input type="checkbox" class="observer">');
    if ( container ) {
      container.append(check);
    } 
    updateCheckbox();
  }

})(jQuery);