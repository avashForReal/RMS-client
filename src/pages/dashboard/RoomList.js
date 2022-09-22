import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { roomsService } from '../../_services';

export default function RoomList() {
  // const { path } = match;
  const path = '/dashboard/rooms';
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    roomsService.getAll().then((x) => {
      setRooms(x);
    });
  }, []);

  function deleteRoom(id) {
    setRooms(
      rooms.map((x) => {
        if (x._id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    roomsService.delete(id).then((res) => {
      setRooms((rooms) => rooms.filter(x => {
        return x._id !== id
      }))
    });
  }

  return (
    <div>
      <h1>Rooms</h1>
      <Link to={`${path}/new`} className="btn btn-sm btn-success mb-2">
        Add rooms
      </Link>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Room Number</th>
              <th style={{ width: '30%' }}>Status</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {rooms &&
              rooms.map((room) => (
                <tr key={room._id}>
                  <td>{room.roomNumber}</td>
                  {room.available? <td style={{color: "#76BA1B"}}>available</td>:<td style={{color: "red"}}>not available</td>}
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <Link to={`${path}/${room._id}/edit`} className="btn btn-sm btn-primary mr-1">
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                      disabled={room.isDeleting}
                    >
                      {room.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Delete</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!rooms && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="spinner-border spinner-border-lg align-center"></div>
                </td>
              </tr>
            )}
            {rooms && !rooms.length && (
              <tr>
                <td colSpan="4" className="text-center">
                  <div className="p-2">No rooms To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
