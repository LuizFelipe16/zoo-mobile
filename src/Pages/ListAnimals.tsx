import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../Services/api';

interface AnimalProps {
  id: number;
  nickname: string;
  name: string;

  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function ListAnimals() {
  const navigation = useNavigation();

  const [animals, setAnimals] = useState<AnimalProps[]>([]);

  useFocusEffect(() => {
    api.get('/animals').then(response => {
      setAnimals(response.data);
    });
  });

  function handleNavigateToAnimalDetails(id: number) {
    navigation.navigate('AnimalDetails', { id });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 15 }}>
      {animals.map((animal) => {
        return (
          <View key={animal.id} style={styles.cardAnimal}>
            <View style={styles.imagesAnimalContainer}>
              <ScrollView horizontal pagingEnabled>
                {animal.images.map(image => {
                  return (
                    <Image
                      key={image.id}
                      style={styles.image}
                      source={{ uri: image.url }}
                    />
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.cardAnimalFooter}>
              <Text style={styles.titleCard}>{animal.nickname === 'Sem Apelido' ? animal.name : animal.nickname}</Text>

              <RectButton onPress={() => handleNavigateToAnimalDetails(animal.id)} style={styles.buttonCard}>
                <Feather name="arrow-right" size={24} color="#32BF84" />
              </RectButton>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  cardAnimal: {
    width: '100%',
    height: 280,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.9,
    borderColor: '#32BF84',
    backgroundColor: '#32BF84',
    elevation: 1,
    marginBottom: 20
  },

  imagesAnimalContainer: {
    height: 190,
  },

  image: {
    width: 330,
    height: 220,
    resizeMode: 'cover',
  },

  cardAnimalFooter: {
    width: '100%',
    height: 90,
    backgroundColor: '#fff',
    padding: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  titleCard: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 19,
    color: '#32BF84'
  },

  buttonCard: {
    width: '40%',
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,

    alignItems: 'center',
    justifyContent: 'center'
  }
})