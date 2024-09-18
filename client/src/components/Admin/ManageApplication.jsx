import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getAllApplications } from '../../redux/slice/applicationSlice';

export default function ManageApplication() {
  const dispatch = useDispatch();
    // get all applications
    useEffect(() => {
      dispatch(getAllApplications({}));
    }, [dispatch]);
  
    const {error, loading, applications} = useSelector((state)=>{
      return state?.application;
    });

    console.log(applications.data)

    return (
      <div>
        <h2>Manage Applications</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">PetID</th>
              <th scope="col">User Email</th>
            </tr>
          </thead>
          <tbody>
            {applications?.data?.map((item) => (
            <tr>
              <td>{item.petID}</td>
              <td>{item.userEmail}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
}
