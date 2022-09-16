import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { subjectService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages'


export default function SubjectCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const params = useParams();
  const id = params.sub;
  // const { id } = match.params;
  // const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Subject name is required'),
    credit_hour: Yup.number().required('Credit hour must be number')
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    return isAddMode ? createSubject(data) : updateSubject(id, data);
  }

  function createSubject(data) {
    return subjectService
      .create(data)
      .then(() => {
        reset()
        showSuccessMessage("Subject added successfully");
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  function updateSubject(id, data) {
    console.log(id,data)
    return subjectService
      .update(id, data)
      .then(() => {
        reset()
        showSuccessMessage("Subject updated successfully");
        // alertService.success('User updated', { keepAfterRouteChange: true });
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      subjectService.getById(id).then((dept) => {
        // console.log(dept)
        const fields = ['name','credit_hour'];
        fields.forEach((field) => setValue(field, dept[field]));
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Subject' : 'Edit Subject'}</h1>
        <div className="form-row">
          <div className="form-group col-7">
            <label>Subject</label>
            <input
              name="name"
              type="text"
              {...register('name')}
              // className={`form-control`}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.name?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>Credit Hour</label>
            <input
              name="credit_hour"
              type="number"
              {...register('credit_hour')}
              // className={`form-control`}
              className={`form-control ${errors.credit_hour ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.credit_hour?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Save
          </button>
          <Link to={'/dashboard/subject'} className="btn btn-link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
