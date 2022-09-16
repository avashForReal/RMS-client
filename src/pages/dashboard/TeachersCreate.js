import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { teachersService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages'


export default function TeachersCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const params = useParams();
  const id = params.teacher;
  // const { id } = match.params;
  // const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Teacher name is required'),
    workload: Yup.number().required('Teacher workload must be number'),
    type: Yup.string().required('Teacher type is required'),
    start: Yup.string().required('Start period is required'),
    end: Yup.string().required('End period is required'),
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
    return isAddMode ? createTeacher(data) : updateTeacher(id, data);
  }

  function createTeacher(data) {
    return teachersService
      .create(data)
      .then(() => {
        reset()
        showSuccessMessage("Subject added successfully");
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  function updateTeacher(id, data) {
    console.log(id,data)
    return teachersService
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
      teachersService.getById(id).then((dept) => {
        // console.log(dept)
        const fields = ['name','workload', 'type', 'start', 'end'];
        fields.forEach((field) => setValue(field, dept[field]));
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Teacher' : 'Edit Teacher'}</h1>
        <div className="form-row">
          <div className="form-group col-7">
            <label>Teacher</label>
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
            <label>Workload</label>
            <input
              name="workload"
              type="number"
              {...register('workload')}
              // className={`form-control`}
              className={`form-control ${errors.workload ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.workload?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>Type</label>
            <input
              name="type"
              type="text"
              {...register('type')}
              // className={`form-control`}
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.workload?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>Start</label>
            <input
              name="start"
              type="text"
              {...register('start')}
              // className={`form-control`}
              className={`form-control ${errors.start ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.start?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>End</label>
            <input
              name="end"
              type="text"
              {...register('end')}
              // className={`form-control`}
              className={`form-control ${errors.end ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.end?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Save
          </button>
          <Link to={'/dashboard/teachers'} className="btn btn-link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
