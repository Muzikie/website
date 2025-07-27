export interface InputProps {
  value: string | undefined;
  onChange: (fieldName: string) => (value: string) => void;
  name: string;
  placeholder: string;
  className?: string;
  wrapperClassName?: string;
  multiline?: boolean;
  inputMode?: 'text'|'decimal'|'numeric'|'email'|'url'|'tel';
}
