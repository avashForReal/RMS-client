import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { departmentService, semesterService, teachersService } from '../../_services';
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

  // for gen of subject teacher fields
  const [teacherdata,setTeacherdata] = useState([]);
  const [subs, setSubs] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Department is required'),
    // subjects: Yup.array().of(
    //   Yup.object().shape({
    //     subject: Yup.string().required('Subject is required'),
    //     teacher: Yup.string().required('Teacher is required'),
    //   })
    // ),
  });

  // functions to build form returned by useForm() hook
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({ name: 'subjects', control });

  // multi select stuff
  const onSelectSemester = (list, item) => {
    setSubs([...subs, ...item.subjects]);
    setSelectedSemester([...selectedsemester, item]);
  };

  const onRemoveSemester = (list, item) => {
    const newSubs = list.map((el, i) => el.subjects[i]);
    setSubs([...newSubs]);
    const newSelected = selectedsemester.filter((el) => el._id !== item._id);
    setSelectedSemester([...newSelected]);
  };

  function onSubmit(data) {
    // console.log("errors",errors)
    console.log("data",data)
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
        setSubs([]);
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
        setSubs([]);
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

    teachersService.getAll().then((x) => {
      setTeachers(x);
    });

    if (!isAddMode) {
      // get user and set form fields
      departmentService.getById(id).then((dept) => {
        // console.log("department =>",dept)
        const subjects = dept.subjects.map(el => el.subject);
        const teachers = dept.subjects.map(el => el.teacher);
        console.log("teachers =>",teachers)
        setSubs(subjects);
        setTeacherdata(teachers);
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

        <div className="form-row">
          <div className="form-group col-7">
            <label>Subjects</label>

            {subs.map((sub, i) => {
              return (
                <>
                  <div className="mt-2" key={i}>
                    <span style={{fontWeight: "bold"}}>{sub.name}</span>
                    <input
                      type="text"
                      {...register(`subjects.${i}.subject`)}
                      className="mb-1 mr-4 d-none"
                      defaultValue={sub._id}
                      readOnly={true}

                      // disabled={true}
                      // value={subjects[i}].subject}
                      // className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />

                    <span style={{marginLeft: "60px"}}>Teacher:</span>

                    <select style={{width: "200px",marginLeft:"10px"}} {...register(`subjects.${i}.teacher`)} className="form-select form-select-sm">
                      {teachers.map((t, index) => {
                        return (
                          <>
                            {/* {console.log("teacher data", teacherdata[i])} */}
                            <option selected={teacherdata[i]?._id === t._id} key={index} value={t._id}>
                              {t.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    {/* <input
                  type="text"
                  {...register(`subjects[${i}].teacher`)}
                  className={`ml-2`}
                /> */}
                  </div>
                </>
              );
            })}
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
