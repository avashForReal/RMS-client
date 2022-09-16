import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { roomsService } from '../../_services';
import { showSuccessMessage, showErrorMessage } from '../../_helpers/messages'


export default function RoomCreate() {
  const { pathname } = useLocation();
  const isAddMode = !pathname.includes('edit');
  const params = useParams();
  const id = params.room;
  // const { id } = match.params;
  // const isAddMode = !id;

  // form validation rules
  const validationSchema = Yup.object().shape({
    room_number: Yup.number().required('Room number is required')
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
    return isAddMode ? createRoom(data) : updateRoom(id, data);
  }

  function createRoom(data) {
    return roomsService
      .create(data)
      .then(() => {
        reset()
        showSuccessMessage("Room added successfully");
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  function updateRoom(id, data) {
    console.log(id,data)
    return roomsService
      .update(id, data)
      .then(() => {
        reset()
        showSuccessMessage("Room updated successfully");
        // alertService.success('User updated', { keepAfterRouteChange: true });
      })
      .catch(() => {
        showErrorMessage("something went wrong. try again")
      });
  }

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      roomsService.getById(id).then((room) => {
        // console.log(room)
        const fields = ['room_number','available'];
        fields.forEach((field) => setValue(field, room[field]));
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
        <h1>{isAddMode ? 'Add Room' : 'Edit Room'}</h1>
        <div className="form-row">
          <div className="form-group col-7">
            <label>Room Number</label>
            <input
              name="room_number"
              type="number"
              {...register('room_number')}
              // className={`form-control`}
              className={`form-control ${errors.room_number ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors?.room_number?.message}</div>
          </div>
          <div className="form-group col-7">
            <label>available</label>
            <input
              name="available"
              type="checkbox"
              {...register('available')}
              // className={`form-control`}
              className={`form-control`}
            />
            {/* <div className="invalid-feedback">{errors?.credit_hour?.message}</div> */}
          </div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Save
          </button>
          <Link to={'/dashboard/rooms'} className="btn btn-link">
            Go back
          </Link>
        </div>
      </form>
    </>
  );
}
