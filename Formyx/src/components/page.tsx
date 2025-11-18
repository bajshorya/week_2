import React from "react";

const Form = () => {
  return (
    <div>
      <form className="formyx-form">
        <div className="formyx-field">
          <label className="formyx-label">Test Field</label>
          <input
            type="text"
            className="formyx-input"
            placeholder="Enter text"
          />
        </div>
        <button type="submit" className="formyx-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
