export const FETCH_TEACHERS_DATA = 'FETCH_TEACHERS_DATA';
export const FETCH_TEACHERS_DATA_FAILURE = 'FETCH_TEACHERS_DATA_FAILURE';
export const LOAD_TEACHERS_DATA = 'LOAD_TEACHERS_DATA';
export const ONE_TEACHER_DATA = 'ONE_TEACHER_DATA';
import axios from 'axios';

export const fetchTeachersData = (payload) => {
    return {
        type: FETCH_TEACHERS_DATA,
         payload
    }
}

export const fetchOne = (payload) => {
    return {
        type: ONE_TEACHER_DATA,
            payload
    }
}

export const fetchTeachersDataFailure = (payload) => {
    return {
        type: FETCH_TEACHERS_DATA_FAILURE,
        payload: payload
    }
}
export const loadTeachersData = () => {
    return {
        type: LOAD_TEACHERS_DATA,
    }
}


export const getTeachersData = () => (dispatch) => {
    dispatch(loadTeachersData());
    return axios.get('https://my-app-deep.herokuapp.com/teachers').
    then(response=>{
        // console.log(response.data);
        dispatch(fetchTeachersData(response.data))
    }).catch((err) => {
        dispatch(fetchTeachersDataFailure(err.message));
    });
}

export const getOneTeacher = (id) => (dispatch) => {
    dispatch(loadTeachersData());
    return axios.get(`https://my-app-deep.herokuapp.com/teachers/${id}`).
    then(response=>{
         console.log(response.data);
        dispatch(fetchOne(response.data))
    }).catch((err) => {
        {dispatch(fetchTeachersDataFailure(err.message));
        }});
}


export const addTeacher = (payload) => (dispatch) => {
    dispatch(loadTeachersData());
    fetch('https://my-app-deep.herokuapp.com/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + payload.token
        }
        , body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            gender: payload.gender,
            age: payload.age,
            class: payload.class
        })
    }).then((res) => {
        res.json()
    }).then((data) => {
        dispatch(fetchTeachersData(data))
    })
    .catch((err) => {
        dispatch(fetchTeachersDataFailure());
    })
}


