interface AuthState {
    token:string | null;
    loading: Boolean;
    error: Error|null;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error:null
};

const prefix = 'backend/auth';

export const {pending, success, fail} = createActions('PENDING', 'SUCCESS', 'FAIL', {prefix});

const reducer = handleActions({
    PENDING: ()=> ({
        ...State,
        loading: true,
        error: null,
    }),
    SUCCESS : (state,action) => ({
        ...state,
        loading: false,
        error: action, payload
    })
})