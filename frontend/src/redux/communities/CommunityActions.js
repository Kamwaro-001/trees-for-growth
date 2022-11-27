import axios from "axios"
import {
  GET_COMMUNITIES,
  ADD_COMMUNITY,
  UPDATE_COMMUNITY,
  DELETE_COMMUNITY
} from "./CommunityTypes"

export const getCommunities = () => dispatch => {
  axios
    .get('/api/communities/')
    .then(response => {
      dispatch({
        type: GET_COMMUNITIES,
        payload: response.data
      })
    })
    .catch(error => {
      // TODO remove clg
      console.log(error)
    })
}

export const addCommunity = community => dispatch => {
  axios
    .post('/api/communities/', community)
    .then(response => {
      dispatch({
        type: ADD_COMMUNITY,
        payload: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
}

export const updateCommunity = (id, community) => dispatch => {
  axios
    .patch(`/api/communities/${id}`, community)
    .then(response => {
      dispatch({
        type: UPDATE_COMMUNITY,
        payload: response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
}

export const deleteCommunity = (id) => dispatch => {
  axios
    .delete(`/api/communities/${id}`)
    .then(response => {
      dispatch({
        type: DELETE_COMMUNITY,
        payload: id
      })
    })
    .catch(error => {
      console.log(error)
    })
}
