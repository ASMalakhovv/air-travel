const initState: Array<FlightState> = []

export const flightReducer = (state: Array<FlightState> = initState, action: FlightAction): Array<FlightState> => {
    switch (action.type) {
        case 'flight/SET-FLIGHT': {
            return [...action.payload]
        }
        default :
            return state
    }
}

//action-creator
export const setFlight = (payload: Array<FlightState>) => {
    return {
        type: 'flight/SET-FLIGHT',
        payload
    } as const
}

//types
export type FlightState = { id: string }
export type SetIdFlight = ReturnType<typeof setFlight>
export type FlightAction = SetIdFlight