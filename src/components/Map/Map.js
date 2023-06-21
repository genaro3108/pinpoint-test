import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import {
  COLLISION_RANKING_TIERS,
  MARKER_ANCHOR,
  MiMapView,
} from '@mappedin/react-native-sdk';

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
};

const Map = () => {

  const mapView = useRef(null);
  const [marker, setMarker] = useState();
  const [position, setPosition] = useState();


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MiMapView
        ref={mapView}
        style={{ flex: 1 }}
        key="mappedin"
        options={options}
        Copy
        onClick={(e) => {
          const { polygons, position } = e;

          if (marker) {
            mapView.current?.removeMarker(marker);
          }

          if (polygons.length > 0) {
            const location = polygons[0].locations[0];
            const entrance = polygons[0].entrances[0];

            if (!location || !entrance) return;

            setPosition(position);

            const newMarker = mapView.current?.createMarker(
              entrance,
              `
                <div style="background-color: white; border: 2px solid black; padding: 0.4rem; border-radius: 0.4rem;">
                  ${location.name}
                </div>
              `,
              {
                anchor: MARKER_ANCHOR.CENTER,
                rank: COLLISION_RANKING_TIERS.ALWAYS_VISIBLE,
              },
            );
            setMarker(newMarker)
          }
        }}
      />
      <View>
        <Text>Position: {!position ? 'Not selected' : `${position?.latitude},${position?.longitude}`} </Text>
      </View>
    </SafeAreaView>
  );
};

export default Map;