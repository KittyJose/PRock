import { useState } from "react"

interface SProps {
  options: string[]
  onChange: (options: string) => void
  name: string
}

export const SelectComponent: React.FC<SProps> = ({ options, onChange, name }) => {
  const [value, setValue] = useState<string>("")

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    let selected : string = event.currentTarget.value;
    setValue(selected)
    if(onChange) onChange(selected)
  };
  

  return <select key={`${name}__select`}
    className="form-select"
    value={value}
    onChange={ e => handleChange(e) }
    >
      <option key={`placeholder`}>{`Please select ${name} ...`}</option>
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
  </select>
}