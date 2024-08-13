import { useState } from 'react';

export function useErrors() {
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    [],
  );

  console.log({ errors });
  function setError({ field, message }: { field: string; message: string }) {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }
    setErrors((prevState) => [...prevState, { field, message }]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== fieldName),
    );
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
