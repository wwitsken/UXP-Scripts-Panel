import React, { useState } from 'react';
import Spectrum from 'react-uxp-spectrum';
import Checkmark from './icons/Checkmark';
import addVariable from '../utils/addVariable';

interface Props {
  dialogElement: HTMLDialogElement;
  refresh: () => void;
}

export default function TextVariableDialog({ dialogElement, refresh }: Props) {
  const [variableName, setVariableName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const closinator = () => dialogElement.close();
  const handleSubmit = () => addVariable(variableName, refresh, setErrorMsg, closinator);

  return (
    <div className="dialog-content">
      <Spectrum.Heading size="M">Enter A New Variable Name</Spectrum.Heading>
      <Spectrum.Detail weight="light">Remember: variables are alphabetically ordered.</Spectrum.Detail>
      {errorMsg && (
        <Spectrum.Detail weight="light" size="S" className="text-red mt-10">
          {errorMsg}
        </Spectrum.Detail>
      )}
      <Spectrum.Textfield className="w-full mt-10" onInput={(e) => setVariableName(e.target.value)}>
        {variableName}
      </Spectrum.Textfield>
      <div className="flex-row mt-20">
        <Spectrum.ActionButton onClick={() => handleSubmit()}>
          <Checkmark />
        </Spectrum.ActionButton>
        <Spectrum.ActionButton onClick={() => dialogElement.close()}>Cancel</Spectrum.ActionButton>
      </div>
    </div>
  );
}
