import React, { useState, useReducer } from 'react';

const CreateForm = () => {

  // const [features, setFeatures] = useState(['']);

  const [features, dispatch] = useReducer((features: string[], { type, index, value }: any) => {
    switch (type) {
      case "add":
        return [...features, ''];
      case "remove":
        return features.filter((_, index) => index !== value);
      case "modify":
        return features.map((val, index) => index == value ? value : val )
      default:
        return features;
    }
  }, ['']);

  // const addFeature = () => {
  //   setFeatures([
  //     ...features,
  //     ''
  //   ]);
  // };

  const handleFeatureInput = (featureIdx: number, e: Event) => {
    console.log(features);
    // console.log(text);
    // features[featureIdx] = text
    if (!e.target || !e.target.value) {
        return;
    }

    dispatch({type: 'modify', index: featureIdx, value: e.target.value});
  }

  const FeatureFormList = () => {
      return (
        <React.Fragment>
        <h1 className="title">Features</h1>
          <div>
            {features.map((feature, idx) => {
                return (
                    <div className="field" key={idx}>
                      <label className="label">Feature #{idx+1}</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="feature"
                          value={features[idx]}
                          onChange={e => handleFeatureInput(idx, e)}
                        />
                      </div>
                    </div>
                )
            })}
          </div>
        </React.Fragment>
       );
  }

  return (
    <div className="container">
      <h1> Create form page </h1>
      <FeatureFormList />
    </div>
  );
}

export default CreateForm;