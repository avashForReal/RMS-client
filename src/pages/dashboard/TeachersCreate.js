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
    workload: Yup.number().typeError('Teacher workload must be number').required('Teacher workload is required'),
    // type: Yup.string().required('Teacher type is required'),
    startTime: Yup.string().matches(/^([01]\d|2[0-3]):([0-5]\d)$/,'Must be in format of HH:MM').required('Start time is required'),
    endTime: Yup.string('Must be string').matches(/^([01]\d|2[0-3]):([0-5]\d)$/,'Must be in format of HH:MM').required('End time is required'),
    initial: Yup.string().required('Teacher initial is required'),
  });


  // time: `${START}-${END}`
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
        showSuccessMessage("Teacher added successfully");
      })
      .catch((err) => {
        showErrorMessage(err || "something went wrong. try again")
      });
  }

  function updateTeacher(id, data) {
    console.log(id,data)
    return teachersService
      .update(id, data)
      .then(() => {
        reset()
        showSuccessMessage("Teacher updated successfully");
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
        const fields = ['name','workload', 'startTime', 'endTime', 'initial'];
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
            <label>Teacher Name</label>
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
          {/* <div className="form-group col-7">
            <label>Type</label>
            <input
              name="type"
              type="text"
              {...register('type')}
              // className={`form-control`}
              className={`form-control ${errors.type ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.workload?.message}</div>
          </div> */}
          <div className="form-group col-7">
            <label>Start Time</label>
            <input
              name="startTime"
              type="text"
              {...register('startTime')}
              // className={`form-control`}
              className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.startTime?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>End Time</label>
            <input
              name="endTime"
              type="text"
              {...register('endTime')}
              // className={`form-control`}
              className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.endTime?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>Initial</label>
            <input
              name="initial"
              type="text"
              {...register('initial')}
              // className={`form-control`}
              className={`form-control ${errors.initial ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.initial?.message}</div>
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
