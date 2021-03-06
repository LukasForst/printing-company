import React, { Component } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import 'materialize-css';
import { Autocomplete, Select } from 'react-materialize';
import SubmitButton from '../tools/SubmitButton';
import ResetButton from '../tools/ResetButton';
import DeleteButton from '../tools/DeleteButton';

export default class WorkAssignment extends Component {
  static propTypes = {
    employees: PropTypes.instanceOf(Object).isRequired,
    workTypes: PropTypes.instanceOf(Object).isRequired,
    motives: PropTypes.instanceOf(Set).isRequired,
    work: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    deleteAssignment: PropTypes.func.isRequired,
    addingNew: PropTypes.bool,
  };

  selector = (value, data, label, nameSelector) => (
    <Field name={value}>
      {({ input }) => (
        <Select
          value={`${input.value}`}
          label={label}
          onChange={(d) => {
            input.onChange(d);
          }}>
          {Object.values(data).map((x) => (
            <option key={x.id} value={x.id} name={x.name}>
              {nameSelector(x)}
            </option>
          ))}
        </Select>
      )}
    </Field>
  );

  prepareCompletionData = (data) => {
    const obj = {};
    data.forEach((d) => (obj[d] = null));
    return obj;
  };

  autoComplete = (value, data, label) => (
    <Field name={value}>
      {({ input }) => (
        <Autocomplete
          value={input.value}
          title={label}
          placeholder={label}
          options={{
            data: this.prepareCompletionData(data),
            onAutocomplete: (e) => {
              input.onChange(e);
            },
          }}
          onChange={(event) => {
            input.onChange(event);
          }}
        />
      )}
    </Field>
  );

  convert = (work) => {
    return {
      ...work,
      employeeId: parseInt(work.employeeId),
      workTypeId: parseInt(work.workTypeId),
      amount: parseInt(work.amount),
    };
  };

  render() {
    const { employees, motives, workTypes, work, onChange, deleteAssignment, addingNew } = this.props;

    return (
      <Form
        onSubmit={(w) => onChange(this.convert(w))}
        initialValues={work}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="work-assignment-container">
            <div className="work-assignment-cell">
              {this.selector('employeeId', employees, 'Zaměstnanec', x => `${x.name} ${x.surname}`)}
            </div>

            <div className="work-assignment-cell autocomplete-cell">
              {this.autoComplete('motive', [...motives.values()], 'Motiv')}
            </div>

            <div className="work-assignment-cell">
              {this.selector('workTypeId', workTypes, 'Typ práce', x => x.name)}
            </div>

            <div className="work-assignment-cell">
              <label>Množství</label>
              <Field name="amount" component="input" placeholder="Množství"/>
            </div>

            <div className="work-assignment-buttons">
              <SubmitButton disabled={submitting || pristine}/>
              <ResetButton disabled={submitting || pristine} onClick={form.reset}/>
              <DeleteButton disabled={addingNew || false} onClick={deleteAssignment}/>
            </div>
          </form>
        )}
      />
    );
  }
}
