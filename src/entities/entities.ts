export type AirTravel = {
    result: FlightsType
}

export type FlightsType = {
    flights: Array<FlightOption>
    bestPrices: any
}

export type FlightOption = {
    hasExtendedFare: boolean
    flight: Flight
    flightToken: any

}

export type Flight = {
    carrier: Carrier
    price: FlightPrice
    servicesStatuses: ServicesStatuses
    legs: Array<Legs>
    exchange: any
    isTripartiteContractDiscountApplied: boolean
    international: boolean
    seats: any
    refund: any

}
type Carrier = {
    uid: string
    caption: string
    airlineCode: string
}
type FlightPrice = {
    total: PriceTotal
    totalFeeAndTaxes: PriceTotal
    rates: Rates
    passengerPrices: Array<PassengerPrices>
}
type PriceTotal = {
    amount: string
    currency: string
    currencyCode: string
}
type Rates = {
    totalUsd: Omit<PriceTotal, 'currency'>
    totalEur: Omit<PriceTotal, 'currency'>
}
type PassengerPrices = {
    total: PriceTotal
    passengerType: Omit<Carrier, 'airlineCode'>
    singlePassengerTotal: PriceTotal
    passengerCount: number
    tariff: PriceTotal
    feeAndTaxes: PriceTotal
}
type ServicesStatuses = {
    baggage: Omit<Carrier, 'airlineCode'>
    exchange: Omit<Carrier, 'airlineCode'>
    refund: Omit<Carrier, 'airlineCode'>
}
export type Legs = {
    duration: number
    segments: Array<Segments>
}
export type Segments = {
    classOfServiceCode: string
    classOfService: Omit<Carrier, 'airlineCode'>
    departureAirport: Omit<Carrier, 'airlineCode'>
    departureCity?: Omit<Carrier, 'airlineCode'>
    aircraft: Omit<Carrier, 'airlineCode'>
    travelDuration: number
    arrivalCity?: Omit<Carrier, 'airlineCode'>
    arrivalDate: string
    flightNumber: string
    techStopInfos: any
    departureDate: string
    stops: number
    servicesDetails: any
    airline: Carrier
    starting: boolean
    arrivalAirport: Omit<Carrier, 'airlineCode'>
}

type BestPrices = {
    ONE_CONNECTION: { bestFlights: Array<BestFlights> }
    DIRECT: { bestFlights: Array<BestFlights> }
}
type BestFlights = {
    carrier: Carrier
    price: PriceTotal
}