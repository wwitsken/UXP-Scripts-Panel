import React from 'react';
import Spectrum from 'react-uxp-spectrum';
import removeVariable from '../utils/removeVariable';

interface Props {
  dialogElement: HTMLDialogElement;
  refresh: () => void;
  variableName: string;
  instances: number;
}

export default function TextVariableDeleteDialog({ dialogElement, refresh, variableName, instances }: Props) {
  const closinator = () => dialogElement.close();

  const handleSubmit = () => {
    removeVariable(variableName, refresh);
    closinator();
  };

  return (
    <div className="dialog-content">
      <Spectrum.Heading size="M">Confirm</Spectrum.Heading>
      <Spectrum.Body>Are you sure you want to delete this variable?</Spectrum.Body>
      <Spectrum.Body>{instances} instances found in the active document.</Spectrum.Body>
      <div className="flex-row">
        <Spectrum.ActionButton
          onClick={() => {
            handleSubmit();
          }}
        >
          Yes
        </Spectrum.ActionButton>
        <Spectrum.ActionButton onClick={() => closinator()}>No</Spectrum.ActionButton>
      </div>
    </div>
  );
}
