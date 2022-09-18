import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { departmentService, semesterService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages';

export default function DeptCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const params = useParams();
  const id = params.dept;

  // multiselect stuff
  const semref = useRef();
  const [semester, setSemester] = useState([]);
  const [selectedsemester, setSelectedSemester] = useState([]);
  const [semerror, setSemError] = useState(false);

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

  const onSelectSemester = (list, item) => {
    // console.log(item)
    setSelectedSemester([...selectedsemester, item]);
  };

  const onRemoveSemester = (list, item) => {
    const newSelected = selectedsemester.filter((el) => el._id !== item._id);
    setSelectedSemester([...newSelected]);
  };

  function onSubmit(data) {
    return isAddMode ? createDepartment(data) : updateDepartment(id, data);
  }

  function createDepartment(data) {
    if (selectedsemester.length === 0) {
      setSemError(true);
      return;
    }
    setSemError(false);
    let ids = selectedsemester.map((el) => el._id);
    const newData = {
      ...data,
      semesters: ids,
    };

    return departmentService
      .create(newData)
      .then(() => {
        reset();
        semref.current.resetSelectedValues();
        showSuccessMessage('Department added successfully');
      })
      .catch((err) => {
        showErrorMessage(err || 'something went wrong. try again');
      });
  }

  function updateDepartment(id, data) {
    if (selectedsemester.length === 0) {
      setSemError(true);
      return;
    }
    setSemError(false);
    let ids = selectedsemester.map((el) => el._id);
    const newData = {
      ...data,
      semesters: ids,
    };
    return departmentService
      .update(id, newData)
      .then(() => {
        reset();
        semref.current.resetSelectedValues();
        showSuccessMessage('Department updated successfully');
        // alertService.success('User updated', { keepAfterRouteChange: true });
      })
      .catch((err) => {
        showErrorMessage(err || 'something went wrong. try again');
      });
  }

  useEffect(() => {
    semesterService.getAll().then((x) => {
      setSemester(x);
    });

    if (!isAddMode) {
      // get user and set form fields
      departmentService.getById(id).then((dept) => {
        setValue('name', dept.name);
        setSelectedSemester(dept.semesters);
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

        <div className="form-row">
          <div className="form-group col-7">
            <label>Semesters</label>
            <div>
              <Multiselect
                options={semester}
                onSelect={onSelectSemester}
                onRemove={onRemoveSemester}
                displayValue="semester"
                selectedValues={selectedsemester}
                ref={semref}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          {semerror && (
            <div style={{ color: 'red' }} className="">
              Semester cannot be empty
            </div>
          )}
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
