import React, { useEffect } from 'react';
import { StyleSheet, View, Text, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface VectorMapProps {
  showRoute?: boolean;
  riderMoving?: boolean;
  height?: number;
}

const ViewAny = View as any;

export function VectorMap({ showRoute = false, riderMoving = false, height = 240 }: VectorMapProps) {
  const isDark = useColorScheme() === 'dark';
  const riderProgress = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (riderMoving) {
      riderProgress.value = 0;
      riderProgress.value = withRepeat(
        withTiming(1, { duration: 6000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      riderProgress.value = 0.4; // Static position
    }

    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 1000, easing: Easing.ease }),
        withTiming(1, { duration: 1000, easing: Easing.ease })
      ),
      -1,
      true
    );
  }, [riderMoving]);

  // Route path coordinates (defined in percentages of container width and height)
  // Let's create a route that goes:
  // Start (25%, 75%) -> (25%, 35%) -> (75%, 35%) -> End (75%, 20%)
  const riderStyle = useAnimatedStyle(() => {
    const p = riderProgress.value;
    let left = 25;
    let top = 75;

    // Segment 1: Vertical Up from 75% to 35% (Length = 40)
    // Segment 2: Horizontal Right from 25% to 75% (Length = 50)
    // Segment 3: Vertical Up from 35% to 20% (Length = 15)
    // Total Length = 105
    const t1 = 40 / 105;
    const t2 = 90 / 105;

    if (p < t1) {
      // Scale p to [0, 1] for segment 1
      const segmentP = p / t1;
      left = 25;
      top = 75 - segmentP * 40;
    } else if (p < t2) {
      // Scale p to [0, 1] for segment 2
      const segmentP = (p - t1) / (t2 - t1);
      left = 25 + segmentP * 50;
      top = 35;
    } else {
      // Scale p to [0, 1] for segment 3
      const segmentP = (p - t2) / (1 - t2);
      left = 75;
      top = 35 - segmentP * 15;
    }

    return {
      left: `${left}%`,
      top: `${top}%`,
    };
  });

  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: 2 - pulseScale.value,
    };
  });

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const roadColor = isDark ? '#1C1D21' : '#F1F3F5';
  const roadBorderColor = isDark ? '#2C2E35' : '#E9ECEF';
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <View style={[styles.container, { height, backgroundColor: isDark ? '#111214' : '#F8F9FA' }]}>
      {/* Grid Pattern Background */}
      <View style={StyleSheet.absoluteFill}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ViewAny
            key={`h-${i}`}
            style={[
              styles.gridLineHorizontal,
              { top: `${(i + 1) * 8.3}%`, borderBottomColor: gridColor },
            ]}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <ViewAny
            key={`v-${i}`}
            style={[
              styles.gridLineVertical,
              { left: `${(i + 1) * 8.3}%`, borderRightColor: gridColor },
            ]}
          />
        ))}
      </View>

      {/* Styled Roads System */}
      {/* Road 1: Left Vertical Road */}
      <View
        style={[
          styles.roadVertical,
          { left: '20%', width: '10%', backgroundColor: roadColor, borderColor: roadBorderColor },
        ]}>
        <View style={[styles.roadDividerVertical, { borderStyle: 'dashed', borderColor: dividerColor }]} />
      </View>

      {/* Road 2: Right Vertical Road */}
      <View
        style={[
          styles.roadVertical,
          { left: '70%', width: '10%', backgroundColor: roadColor, borderColor: roadBorderColor },
        ]}>
        <View style={[styles.roadDividerVertical, { borderStyle: 'dashed', borderColor: dividerColor }]} />
      </View>

      {/* Road 3: Middle Horizontal Road */}
      <View
        style={[
          styles.roadHorizontal,
          { top: '30%', height: '10%', backgroundColor: roadColor, borderColor: roadBorderColor },
        ]}>
        <View style={[styles.roadDividerHorizontal, { borderStyle: 'dashed', borderColor: dividerColor }]} />
      </View>

      {/* Road 4: Bottom Horizontal Road */}
      <View
        style={[
          styles.roadHorizontal,
          { top: '70%', height: '10%', backgroundColor: roadColor, borderColor: roadBorderColor },
        ]}>
        <View style={[styles.roadDividerHorizontal, { borderStyle: 'dashed', borderColor: dividerColor }]} />
      </View>

      {/* Delivery Route Draw (Polylines overlay) */}
      {showRoute && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Segment 1: Start to Turn */}
          <View style={[styles.routeLine, { left: '25%', top: '35%', width: 4, height: '40%' }]} />
          {/* Segment 2: Turn to End Turn */}
          <View style={[styles.routeLine, { left: '25%', top: '35%', width: '50%', height: 4 }]} />
          {/* Segment 3: End Turn to Target */}
          <View style={[styles.routeLine, { left: '75%', top: '20%', width: 4, height: '15%' }]} />

          {/* Pickup Marker (Point A) */}
          <View style={[styles.markerContainer, { left: '25%', top: '75%' }]}>
            <Animated.View style={[styles.markerPulse, pulseStyle]} />
            <View style={[styles.markerDot, { backgroundColor: '#10B981' }]}>
              <Text style={styles.markerText}>A</Text>
            </View>
            <View style={styles.markerLabelContainer}>
              <Text style={styles.markerLabel}>Hub (Ikeja)</Text>
            </View>
          </View>

          {/* Dropoff Marker (Point B) */}
          <View style={[styles.markerContainer, { left: '75%', top: '20%' }]}>
            <View style={[styles.markerDot, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.markerText}>B</Text>
            </View>
            <View style={styles.markerLabelContainer}>
              <Text style={styles.markerLabel}>Deliver (Surulere)</Text>
            </View>
          </View>

          {/* Rider Icon */}
          <Animated.View style={[styles.riderMarker, riderStyle]}>
            <View style={styles.riderInner}>
              <Text style={styles.riderEmoji}>🏍️</Text>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Decorative Compass and Scale */}
      <View style={styles.compass}>
        <Text style={styles.compassText}>🧭 N</Text>
      </View>
      <View style={styles.mapScale}>
        <Text style={styles.scaleText}>500m</Text>
        <View style={[styles.scaleLine, { borderColor: isDark ? '#FFF' : '#000' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRightWidth: 1,
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roadDividerVertical: {
    height: '100%',
    borderLeftWidth: 1,
  },
  roadDividerHorizontal: {
    width: '100%',
    borderTopWidth: 1,
  },
  routeLine: {
    position: 'absolute',
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    zIndex: 1,
  },
  markerContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  markerPulse: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
  },
  markerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  markerText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '900',
  },
  markerLabelContainer: {
    position: 'absolute',
    top: -22,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  markerLabel: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  riderMarker: {
    position: 'absolute',
    width: 34,
    height: 34,
    marginLeft: -17,
    marginTop: -17,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  riderInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0B4A3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  riderEmoji: {
    fontSize: 12,
  },
  compass: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  compassText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  mapScale: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    alignItems: 'center',
  },
  scaleText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 2,
  },
  scaleLine: {
    width: 30,
    borderBottomWidth: 2,
  },
});
