import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../constants/ThemeContext';

interface HeaderProps {
  onBackPress: () => void;
  showWave?: boolean;
  waveColor?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  onBackPress,
  showWave = true,
  waveColor,
  children
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.loginHeader }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={40}
          color='#fff'
        />
      </TouchableOpacity>
      
      {children}
      
      {showWave && (
        <Svg
          viewBox="0 0 1440 320"
          style={styles.wave}
          preserveAspectRatio="none"
        >
          <Path
            fill={waveColor || colors.loginWave}
            fillOpacity="1"
            d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,240C1120,277,1280,267,1360,261.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 23,
    height: 160,
    position: "relative",
  },
  wave: {
    position: "absolute",
    bottom: -80,
    left: 0,
    right: 0,
    width: "120%",
    height: 80,
    transform: [{ scaleX: -1 }],
  },
  backButton: {
    zIndex: 1,
    top: 30,
  },
});
