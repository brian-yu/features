import React, {
    useState, useReducer, ChangeEvent, KeyboardEvent, createRef
} from 'react';
import {
  Redirect
} from "react-router-dom";

const FeatureFormList = ({features, setFeatures}: any) => {

  // TODO: condense into one state variable.
  const [submittedForm, setSubmittedForm] = useState(null);
  const [submittedFormId, setSubmittedFormId] = useState(-1);

  const handleInput = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      // Remove if empty.
      if (text === '') {
          if (idx > 0) {
              setFeatures({type: 'remove', index: idx});
          }
      } else {
          // Modify field.
          setFeatures({type: 'setText', index: idx, value: text});
          // Add new field if modifying last.
          if (idx === features.length - 1) {
            setFeatures({type: 'add'});
          }
      }
  }

  const handleKeyPress = (idx: number, e: KeyboardEvent) => {
      // Focus on next field on input.
      if (e.key === "Enter") {
          if (features[idx+1]) {
              features[idx+1].ref.current.focus();    
          }
      }
  }

  const submitForm = () => {

    const formData = {
        password: 'password',
        features: features.filter((feature: any) => feature.text !== '')
            .map((feature: any) => { return {text: feature.text} })
      };
    console.log(formData);
    fetch('http://localhost:8000/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      setSubmittedForm(data);
      setSubmittedFormId(data.id);
    })
  }

  if (submittedForm !== null && submittedFormId >= 0) {
      return (
        <Redirect
          to={{
            pathname: "/form/" + submittedFormId,
            state: { form: submittedForm }
          }}
        />
      )
  }

  return (
    <React.Fragment>
      <div>
        {features.map((feature: any, idx: number) => {
            return (
                <div className="field is-horizontal" key={idx}>
                  <div className="field-label is-normal">
                      <label className="label">Feature #{idx+1}</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                        <div className="control">
                          <input 
                              className="input"
                              type="text"
                              placeholder="feature"
                              value={feature.text}
                              onChange={e => handleInput(idx, e)}
                              onKeyPress={e => handleKeyPress(idx, e)}
                              ref={feature.ref}
                          />
                        </div>
                    </div>
                  </div>
                </div>
            )
        })}
        <div className="field is-horizontal">
          <div className="field-label">
            {/* Left empty for spacing. */}
          </div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button className="button is-primary" onClick={() => submitForm()}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
   );
  }

const CreateForm = () => {
  const [features, setFeatures] = useReducer((features: any[], action: any) => {
    switch (action.type) {
      case "add":
        return [...features, {text: '', ref: createRef()}];
      case "remove":
        return features.filter((_, index) => index !== action.index);
      case "setText":
        return features.map((oldVal, index) => index === action.index ? {text: action.value, ref: oldVal.ref} : oldVal )
      default:
        return features;
    }
  }, ['']);

  return (
    <div className="container">
      <h1 className="title"> Create a new feature list </h1>
      <FeatureFormList features={features} setFeatures={setFeatures} />
    </div>
  );
}

export default CreateForm;