import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { semesterService } from '../../_services';

export default function SemesterList() {
  // const { path } = match;
  const path = '/dashboard/semester';
  const [semester, setSemester] = useState(null);

  useEffect(() => {
    semesterService.getAll().then((x) => {
      setSemester(x);
    });
  }, []);

  function deleteSemester(id) {
    setSemester(
      semester.map((x) => {
        if (x._id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    semesterService.delete(id).then((res) => {
      // console.log("delete res", res);
      setSemester((semester) => semester.filter(x => {
        return x._id !== id
      }))
    });
  }

  return (
    <div>
      <h1>semester</h1>
      <Link to={`${path}/new`} className="btn btn-sm btn-success mb-2">
        Add Semester
      </Link>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Semester</th>
              <th style={{ width: '30%' }}>Subjects</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {semester &&
              semester.map((sem) => (
                <tr key={sem._id}>
                  <td>{sem.semester}</td>
                  <td>{sem.subjects.map((sub,i) => <span key={i} >{sub.name}</span>)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`${path}/${sem._id}/edit`} className="btn btn-sm btn-primary mr-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteSemester(sem._id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                      disabled={sem.isDeleting}
                    >
                      {sem.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!semester && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {semester && !semester.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No semester To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
