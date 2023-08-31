import React from "react"
import Alert from 'react-bootstrap/Alert';

interface EProps {
  message: string
}

export const ErrorMessage : React.FC <EProps> = ({ message }) => {
  return <Alert key={"error_message"} variant={"danger"}>
    {message}
  </Alert>
}