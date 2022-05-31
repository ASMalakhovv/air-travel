import React from 'react';
import {Header} from "./Header/Header";
import {FlightData} from "./FlightData/FlightData";
import {useAppSelector} from "../../hooks/useReactRedux";
import {DataPromise} from "../../utils/getArrayFlights";
import {DataForMap, formattingDataForMap} from "../../utils/formattingDataForMap";

type PropsType = {
    id: string
}

export const Flight = React.memo(({id, ...props}: PropsType) => {
    //react-redux
    const flight: DataPromise[] = useAppSelector(state => state.flightData[id])
    debugger
    //преобразование для map
    const formattingFlightData:DataForMap = formattingDataForMap(flight)
    const {thereBack,thereBackFlightData} = formattingFlightData
    const flightData = thereBackFlightData.map((f => {
        return  <FlightData
        departureUid={f.departureUid}
        departureCity={f.departureCity}
        departureAirport={f.departureAirport}
        arrivalUid={f.arrivalUid}
        arrivalCity={f.arrivalCity}
        arrivalAirport={f.arrivalAirport}
        carrier={thereBack.caption}
        />
    }))
    //action

    return (
        <div>
            <Header
                carrier={thereBack.caption}
                age={thereBack.age}
                currencyCode={thereBack.currencyCode}
                amount={thereBack.totalPrice}
                passengerCountThereBack={thereBack.passengerCountThereBack}
            />
            {flightData}
            <button>Выбрать</button>
        </div>
    );
})
