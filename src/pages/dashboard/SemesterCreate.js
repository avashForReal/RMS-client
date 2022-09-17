import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { semesterService, subjectService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages';

export default function SemesterCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const [subject, setSubject] = useState([]);
  const multiref = useRef();
  const [selectedsubject, setSelectedSubject] = useState([]);
  const [presubject, setPreSubject] = useState([]);
  const [suberror, setSubError] = useState(false);
  const params = useParams();
  const id = params.sem;
  // const { id } = match.params;
  // const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    semester: Yup.number().required('Semester number is required'),
    // subjects: Yup.array().required('Semester subjects are required'),
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

  const onSelectSubject = (list, item) => {
    setSelectedSubject([...selectedsubject, item._id]);
  };

  const onRemoveSubject = (list, item) => {
    const newSelected = selectedsubject.filter((el) => el !== item._id);
    setSelectedSubject([...newSelected]);
  };

  function onSubmit(data) {
    return isAddMode ? createSemester(data) : updateSemester(id, data);
  }

  function createSemester(data) {
    if (selectedsubject.length === 0) {
      setSubError(true);
      return;
    }
    setSubError(false);
    const newData = {
      ...data,
      subjects: selectedsubject,
    };
    return semesterService
      .create(newData)
      .then(() => {
        reset();
        multiref.current.resetSelectedValues();
        showSuccessMessage('Semester added successfully');
      })
      .catch((err) => {
        showErrorMessage(err || 'something went wrong. try again');
      });
  }

  function updateSemester(id, data) {
    return semesterService
      .update(id, data)
      .then(() => {
        reset();
        showSuccessMessage('Semester updated successfully');
      })
      .catch(() => {
        showErrorMessage('something went wrong. try again');
      });
  }

  useEffect(() => {
    subjectService.getAll().then((x) => {
      setSubject(x);
    });
    if (!isAddMode) {
      // get user and set form fields
      semesterService.getById(id).then((sem) => {
        setValue('semester', sem.semester);
        setPreSubject(sem.subjects);
        // sem.subjects.map(el => {
        //   setSelectedSubject([...selectedsubject,el._id])
        // })
      });
    }
  }, []);

  return (
    <>
      {/* {JSON.stringify(presubject)} */}
      {JSON.stringify(selectedsubject)}
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Semester' : 'Edit Semester'}</h1>
        <div className="form-row">
          <div className="form-group col-7">
            <label>Semester</label>
            <input
              name="semester"
              type="number"
              {...register('semester')}
              // className={`form-control`}
              className={`form-control ${errors.semester ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.semester?.message}</div>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-7">
            <label>subjects</label>
            <div>
              <Multiselect
                options={subject}
                onSelect={onSelectSubject}
                onRemove={onRemoveSubject}
                displayValue="name"
                selectedValues={presubject}
                ref={multiref}
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          {suberror && (
            <div style={{ color: 'red' }} className="">
              Subject cannot be empty
            </div>
          )}
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Save
          </button>
          <Link to={'/dashboard/semester'} className="btn btn-link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
