import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { departmentService } from '../../_services';

export default function DeptList() {
  // const { path } = match;
  const path = '/dashboard/department';
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    departmentService.getAll().then((x) => {
      console.log('after set dept', x);
      setDepartment(x);
    });

  }, []);

  function deleteDepartment(id) {
    setDepartment(
      department.map((x) => {
        if (x._id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    departmentService.delete(id).then((res) => {
      setDepartment((department) => department.filter(x => {
        return x._id !== id
      }))
      // setDepartment((department) => department.filter((x) => x._id !== id));
    });
  }

  return (
    <div>
      <h1>Department</h1>
      <Link to={`${path}/new`} className="btn btn-sm btn-success mb-2">
        Add Department
      </Link>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Name</th>
              <th style={{ width: '20%' }}>Semesters</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {department &&
              department.map((dept) => (
                <tr key={dept._id}>
                  <td>{dept.name}</td>
                  <td>{dept.semesters.map((sem,i) => <span key={i} >{sem.semester}</span>)}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`${path}/${dept._id}/edit`} className="btn btn-sm btn-primary mr-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDepartment(dept._id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                      disabled={dept.isDeleting}
                    >
                      {dept.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!department && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {department && !department.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No department To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
