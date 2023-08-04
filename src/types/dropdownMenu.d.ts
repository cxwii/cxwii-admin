export type dropdownMenuSchema = {
  disabled?: boolean
  divided?: boolean
  label: string
  command?: (item: dropdownMenuSchema) => void
}
