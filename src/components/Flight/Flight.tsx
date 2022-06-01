import React from 'react';
import {Header} from './Header/Header';
import {FlightData} from './FlightData/FlightData';
import {useAppSelector} from '../../hooks/useReactRedux';
import {DataPromise} from '../../utils/getArrayFlights';
import {DataForMap, formattingDataForMap} from '../../utils/formattingDataForMap';
import s from './Flight.module.scss'

type PropsType = {
    id: string
}

export const Flight = React.memo(({id, ...props}: PropsType) => {
    //react-redux
    const flight: DataPromise[] = useAppSelector(state => state.flightData[id])
    //преобразование для map
    const formattingFlightData: DataForMap = formattingDataForMap(flight)
    const {thereBack, thereBackFlightData} = formattingFlightData
    const flightData = thereBackFlightData.map(((f, i) => {
        return <FlightData
            key={id + i}
            departureUid={f.departureUid}
            departureCity={f.departureCity}
            departureAirport={f.departureAirport}
            arrivalUid={f.arrivalUid}
            arrivalCity={f.arrivalCity}
            arrivalAirport={f.arrivalAirport}
            carrier={thereBack.caption}
            flightTime={f.flightDuration}
            departureTime={f.departureTimeData.time}
            departureData={f.departureTimeData.data}
            arrivalData={f.arrivalTimeData.data}
            arrivalTime={f.arrivalTimeData.time}
            transfer={f.transfer}
        />
    }))

    return (
        <div className={s.flightContainer}>
            <Header
                carrier={thereBack.caption}
                age={thereBack.age}
                currencyCode={thereBack.currencyCode}
                amount={thereBack.totalPrice}
                passengerCountThereBack={thereBack.passengerCountThereBack}
            />
            {flightData}
            <button>ВЫБРАТЬ</button>
        </div>
    );
})
