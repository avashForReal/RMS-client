import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { teachersService } from '../../_services';

export default function DeptList() {
  // const { path } = match;
  const path = '/dashboard/teachers';
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    teachersService.getAll().then((x) => {
      setTeachers(x);
    });
  }, []);

  function deleteTeacher(id) {
    setTeachers(
      teachers.map((x) => {
        if (x._id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    teachersService.delete(id).then((res) => {
      setTeachers((teachers) => teachers.filter(x => {
        return x._id !== id
      }))
    });
  }

  return (
    <div>
      <h1>teachers</h1>
      <Link to={`${path}/new`} className="btn btn-sm btn-success mb-2">
        Add teacher
      </Link>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '10%' }}>Workload</th>
              <th style={{ width: '10%' }}>Type</th>
              <th style={{ width: '20%' }}>Start Time</th>
              <th style={{ width: '20%' }}>End Time</th>
              <th style={{ width: '20%' }}>Initial</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {teachers &&
              teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.workload}</td>
                  <td>{teacher.type}</td>
                  <td>{teacher.startTime}</td>
                  <td>{teacher.endTime}</td>
                  <td>{teacher.initial}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`${path}/${teacher._id}/edit`} className="btn btn-sm btn-primary mr-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTeacher(teacher._id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                      disabled={teacher.isDeleting}
                    >
                      {teacher.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!teachers && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {teachers && !teachers.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No teachers To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
