import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { mockLocations } from '../../mocks/mockLocations';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { UserLocation } from './types';

export const FlyMap = () => {
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

    const mapView = useRef<MapView | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location);
        })();
    }, []);

    useEffect(() => {
        if (userLocation && mapView.current) {
            const distances = mockLocations.map(location => {
                return getDistance(
                    { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
                    { latitude: location.latitude, longitude: location.longitude }
                );
            });

            const indices = distances.map((distance, index) => index)
                .sort((a, b) => distances[a] - distances[b])
                .slice(0, 5);

            const closestLocations = indices.map(index => mockLocations[index]);

            const minLat = Math.min(userLocation.coords.latitude, ...closestLocations.map(location => location.latitude));
            const maxLat = Math.max(userLocation.coords.latitude, ...closestLocations.map(location => location.latitude));
            const minLon = Math.min(userLocation.coords.longitude, ...closestLocations.map(location => location.longitude));
            const maxLon = Math.max(userLocation.coords.longitude, ...closestLocations.map(location => location.longitude));

            mapView.current.animateToRegion({
                latitude: (minLat + maxLat) / 2,
                longitude: (minLon + maxLon) / 2,
                latitudeDelta: (maxLat - minLat) * 2,
                longitudeDelta: (maxLon - minLon) * 2,
            });
        }
    }, [userLocation]);

    return (
        <MapView
            ref={mapView}
            style={{ width: '100%', height: '100%' }}
            showsUserLocation={true}
            initialRegion={{
                latitude: 39.7392,
                longitude: -105.5,
                latitudeDelta: 3,
                longitudeDelta: 3,
            }}
        >
            {mockLocations.map(location => (
                <Marker
                    key={location.id}
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title={location.title}
                    description={location.description}
                />
            ))}
        </MapView>
    );
}
