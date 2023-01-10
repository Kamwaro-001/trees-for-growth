import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, showNotifications, unset } from '../../slices/Notifications.Slice';

const BoardUser = () => {

  const dispatch = useDispatch()
  const all = useSelector(showNotifications)

  // useEffect(() => {
  //   dispatch(getNotifications())
  // }, [dispatch])

  const getAll = () => {
    return dispatch(getNotifications())
  }
 
  const clear = () => {
    return dispatch(unset())
  }

  const len = []

  all.map((e) => (len.push(e)))

  console.log(all)
  return (
    <div className="p-5 bg-info">
      <h1>Test Notifications</h1>

      <button className='btn btn-success' onClick={getAll}>
        dispatch
      </button>

      <button className='btn btn-danger mx-3' onClick={clear}>
        clear
      </button>

      <div>
        <p className='bg-light'>number: {len.length}</p>
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>status</th>
            <th>time sent</th>
          </tr>
          {all &&
            all.map((n, i) => (
              <tr key={i}>
                <td>{n.title}</td>
                <td>{n.status}</td>
                <td>{n.time_sent}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
}

export default BoardUser