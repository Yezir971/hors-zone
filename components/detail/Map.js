'use client'

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'
const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    border: 'solid 1px var(--gris)',
}

const Map = ({ long, lat, titre }) => {
    const center = {
        lat: lat,
        lng: long,
    }
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_LOCATION_API_KEY,
    })
    const [map, setMap] = useState(null)
    const onLoad = useCallback(function callback(mapInstance) {
        setMap(mapInstance)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF
                position={center}
                label={{ text: titre, fontSize: '14px', color: 'red' }}
                icon={{
                    url: '/images/icons/google_maps_pin.svg',
                    labelOrigin: new window.google.maps.Point(60, 12),
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    )
}

export default Map
