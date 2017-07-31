import reducerFactory from 'shared/utils/ReducerFactory';

export const followersDomain = 'followers';

export const FETCH_USER_FOLLOWER_SUCCESS = 'FETCH_USER_FOLLOWER_SUCCESS';
export const FETCH_USER_FOLLOWER_ERROR = 'FETCH_USER_FOLLOWER_ERROR';
export const GET_RELATIONSHIP_SUCCESS = 'GET_RELATIONSHIP_SUCCESS';
export const GET_RELATIONSHIP_ERROR = 'GET_RELATIONSHIP_ERROR';
export const SET_RELATIONSHIP_SUCCESS = 'SET_RELATIONSHIP_SUCCESS';
export const SET_RELATIONSHIP_ERROR = 'SET_RELATIONSHIP_ERROR';

export const initialState = {
    errorMessage: null,
    relationships: [],
    followedBy: []
};

let fetchRelationship = (state, relationship, userId) => {
    let relationships = {...state.relationships};
    relationships[userId] = relationship;
    return {
        ...state,
        relationships: relationships
    }
};

let fetchUserFollowedBy = (state, follower, userId) => {
    let followedBy = {...state.followedBy};
    followedBy[userId] = follower || [];
    return {
        ...state,
        followedBy: followedBy
    }
};

let cases = (state, action) => {
    switch (action.type) {
        case GET_RELATIONSHIP_SUCCESS:
        case GET_RELATIONSHIP_ERROR:
            return fetchRelationship(state, action.data, action.userId);
        case FETCH_USER_FOLLOWER_SUCCESS:
            return fetchUserFollowedBy(state, action.followers, action.userId);
    }
}

export default reducerFactory(initialState, followersDomain, cases);