'use client'

import { useTheme } from '@/context/themeContext'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useState } from 'react'
import Loading from '../Loading'

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    border: 'solid 1px var(--gris)',
}

const Map = ({ long, lat, titre }) => {
    const { theme } = useTheme()
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

    const nightStyle = [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }],
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }],
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }],
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }],
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }],
        },
    ]

    return isLoaded ? (
        <GoogleMap
            center={center}
            mapContainerStyle={containerStyle}
            options={{
                styles: theme === 'dark' ? nightStyle : [],
            }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <MarkerF
                position={center}
                label={{ text: titre, fontSize: '14px', color: 'red' }}
                icon={{
                    url: '/images/icons/google_maps_pin.svg',
                    labelOrigin: new window.google.maps.Point(10, -10),
                }}
            />
        </GoogleMap>
    ) : (
        <div
            style={containerStyle}
            className="flex items-center justify-center bg-gray-100 dark:bg-gray-800"
        >
            <Loading />
        </div>
    )
}

export default Map
