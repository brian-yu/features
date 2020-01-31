import React from 'react';
import {
  useParams
} from "react-router-dom";

const Form = () => {

  let { id } = useParams();

  return (
    <React.Fragment>
      <h1> FORM with id={id}! </h1>
    </React.Fragment>
  );
}

export default Form;