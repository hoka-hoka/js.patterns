interface setUpdate extends JQuery<HTMLElement> {
  update?: typingFunction<string>
}
interface listSubject<T> {
  add(obj: T): void,
}
type typingFunction<C> = (value: C) => void;