export interface FormSummaryProps {
  data: Record<string, string | number | boolean | Record<string, string>>;
}

export interface EntryProps {
  field: string;
  value: string | number | boolean | Record<string, string>;
  dented?: boolean;
}
