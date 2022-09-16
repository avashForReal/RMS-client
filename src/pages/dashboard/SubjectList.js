import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { subjectService } from '../../_services';

export default function SubjectList() {
  // const { path } = match;
  const path = '/dashboard/subject';
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    subjectService.getAll().then((x) => {
      setSubject(x);
    });
  }, []);

  function deleteDepartment(id) {
    setSubject(
      subject.map((x) => {
        if (x._id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    subjectService.delete(id).then((res) => {
      setSubject((subject) => subject.filter(x => {
        return x._id !== id
      }))
    });
  }

  return (
    <div>
      <h1>subjects</h1>
      <Link to={`${path}/new`} className="btn btn-sm btn-success mb-2">
        Add subject
      </Link>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Name</th>
              <th style={{ width: '30%' }}>Credit Hour</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {subject &&
              subject.map((sub) => (
                <tr key={sub._id}>
                  <td>{sub.name}</td>
                  <td>{sub.credit_hour}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`${path}/${sub._id}/edit`} className="btn btn-sm btn-primary mr-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteDepartment(sub._id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                      disabled={sub.isDeleting}
                    >
                      {sub.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!subject && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {subject && !subject.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No subject To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
