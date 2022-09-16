import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { departmentService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages'


export default function DeptCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const params = useParams();
  const id = params.dept;
  // const { id } = match.params;
  // const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Department is required'),
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
    return isAddMode ? createDepartment(data) : updateUser(id, data);
  }

  function createDepartment(data) {
    return departmentService
      .create(data)
      .then(() => {
        reset()
        showSuccessMessage("Department added successfully");
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  function updateUser(id, data) {
    console.log(id,data)
    return departmentService
      .update(id, data)
      .then(() => {
        reset()
        showSuccessMessage("Department updated successfully");
        // alertService.success('User updated', { keepAfterRouteChange: true });
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      departmentService.getById(id).then((dept) => {
        // console.log(dept)
        const fields = ['name'];
        fields.forEach((field) => setValue(field, dept[field]));
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Department' : 'Edit Department'}</h1>
        <div className="form-row">
          <div className="form-group col-7">
            <label>Department</label>
            <input
              name="name"
              type="text"
              {...register('name')}
              // className={`form-control`}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.name?.message}</div>
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Save
          </button>
          <Link to={'/dashboard/department'} className="btn btn-link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
