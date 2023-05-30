import './MapComponent.scss'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'

type Props = {}

type MapProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: string
    ageTo: string
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
    category: string
    isActual: boolean
    video: string
    workSchedule: string
    food: string
    synchronerLink: string
    contact: string
    housingPhoto: string
    date: number
    lat?: number
    lng?: number
}

const MapComponent = (props: Props) => {
    const filtredArrState = useAppSelector((state) => state.filtredArrState)
    const dispatch = useAppDispatch()
    const [mapCenter, setMapCenter] = useState<{
        lat: number
        lng: number
    }>({
        lat: 52.915845892170395,
        lng: 18.496121727194044,
    })

    const { isLoaded } = useLoadScript({
        /* @ts-ignore */
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })
    if (!isLoaded) return <div>loading...</div>

    const onMarkerClick = (location: string) => {
        const currentProject = filtredArrState.filter(
            (element) => element.location === location
        )
        // console.log(currentProject[0].lat)
        if (currentProject[0].lat !== undefined) {
            dispatch(getSearchInput(currentProject[0].lat))
        }
        // if (
        //     currentProject[0].lat !== undefined &&
        //     currentProject[0].lng !== undefined
        // ) {
        //     setMapCenter({
        //         lat: currentProject[0].lat,
        //         lng: currentProject[0].lng,
        //     })
        // }
    }

    return (
        <GoogleMap
            zoom={6}
            center={mapCenter}
            mapContainerClassName="map-container"
        >
            {filtredArrState.map((element: MapProjectType, i: number) =>
                element.lat ? (
                    <Marker
                        key={i}
                        position={{
                            lat: Number(element.lat),
                            lng: Number(element.lng),
                        }}
                        visible={element.isActual ? true : false}
                        onClick={() => onMarkerClick(element.location)}
                    />
                ) : undefined
            )}
        </GoogleMap>
    )
}

export default MapComponent