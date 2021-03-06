import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

import styles from './styles';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  function navigateToGiveClassesPages() {
    navigate('GiveClasses');
  }

  function navigateToStudyPages() {
    navigate('StudyTabs');
  }

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api
      .get('/connections')
      .then(response => setTotalConnections(response.data.total));
  }, []);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          activeOpacity={0.8}
          onPress={navigateToStudyPages}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          activeOpacity={0.8}
          onPress={navigateToGiveClassesPages}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnection}>
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
