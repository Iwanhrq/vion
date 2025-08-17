import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface NetworkStatusHeaderProps {
  percentage: string;
  status: string;
  action: string;
  style?: any;
}

export const NetworkStatusHeader: React.FC<NetworkStatusHeaderProps> = ({
  percentage,
  status,
  action,
  style
}) => {
  return (
    <View style={[styles.header, style]}>
      <Image
        source={require('../assets/images/fundoHeader.png')}
        style={styles.headerBackground}
        resizeMode="contain"
      />
      <View style={styles.headerTextContainer}>
        {percentage && <Text style={styles.headerPercentage}>{percentage}</Text>}
        <Text style={styles.headerStatus} numberOfLines={2}>{status}</Text>
        <Text style={styles.headerAction} numberOfLines={2}>{action}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'absolute',
    top: 10,
  },
  headerTextContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerPercentage: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 280,
    paddingHorizontal: 20,
    paddingTop: 8
  },
  headerAction: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 16,
    paddingHorizontal: 90,
  },
});
