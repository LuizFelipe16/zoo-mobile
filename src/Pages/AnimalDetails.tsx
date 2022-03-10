import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../Services/api';
import { RectButton } from 'react-native-gesture-handler';

interface AnimalDetailsRouteParams {
  id: number;
}

interface Animal {
  id: number;
  name: string;
  nickname: string;
  age: string;
  about: string;
  nationality: string;
  savage: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function AnimalDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const [animal, setAnimal] = useState<Animal>();

  const params = route.params as AnimalDetailsRouteParams;

  function handleUpdateAnimal(id:number) {
    navigation.navigate('AddAnimal', { id })
  }

  async function handleDeleteAnimal() {
    await api.delete(`/animals/${params.id}`);

    navigation.navigate('Landing');
  }

  useEffect(() => {
    api.get(`/animals/${params.id}`).then(response => {
      setAnimal(response.data);
    });
  }, [params.id]);

  if (!animal) {
    return (
      <View style={styles.containerLoading}>
        <Text style={styles.titleLoading}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {animal.images.map(image => {
            return (
              <Image key={image.id} style={styles.image} source={{ uri: image.url }} />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.about}>{animal.about}</Text>

        <View style={styles.separator} />

        <Text style={styles.name}>{animal.name}</Text>
        
        <Text style={styles.text}>
          Meu apelido é - 
          
          <Text style={styles.nickname}>{animal.nickname}</Text>
        </Text>

        <View style={styles.groupText}>
          <Text style={styles.title}>Nacionalidade</Text>
          <Text style={styles.title}>Idade</Text>
        </View>

        <View style={[styles.groupText, { marginBottom: 40 }]}>
          <Text style={styles.description}>{animal.nationality}</Text>
          <Text style={styles.description}>{animal.age}</Text>
        </View>

        {animal.savage ? (
          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>É um animal selvagem</Text>
            </View>
          </View>
        ) : (
          <View style={styles.scheduleContainer}>
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Não é um animal selvagem</Text>
            </View>
          </View>
        )}

        {/* <RectButton style={[styles.button, styles.updateButton]} onPress={() => handleUpdateAnimal(animal.id)}>
          <Text style={styles.buttonText}>Mudar informaçõe!</Text>
        </RectButton> */}

        <RectButton style={[styles.button, styles.deleteButton]} onPress={handleDeleteAnimal}>
          <Text style={styles.buttonText}>Doar animal do seu Zoo!</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  text: {
    width: '100%',
    color: '#32BF84',
    fontSize: 20,
    fontFamily: 'Nunito_400Regular',
    marginTop: 10,
    marginBottom: 20
  },
  
  name: {
    color: '#32BF84',
    fontSize: 22,
    fontFamily: 'Nunito_600SemiBold',
    marginTop: 25
  },
  
  nickname: {
    color: '#32BF84',
    fontSize: 23,
    fontFamily: 'Nunito_700Bold',
    marginLeft: 30
  },

  about: {
    fontFamily: 'Nunito_400Regular',
    color: '#32BF84',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    color: '#32BF84',
    fontSize: 20,
    fontFamily: 'Nunito_400Regular',
    marginTop: 25
  },

  description: {
    fontFamily: 'Nunito_700Bold',
    color: '#32BF84',
    fontSize: 24,
  },

  groupText: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 5,
  },

  separator: {
    height: 0.9,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 20,
  },

  scheduleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '100%',
    padding: 20,
    marginBottom: 40
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FEF6F9',
    borderWidth: 1,
    borderColor: '#FFBCD4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  button: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 15,
    elevation: 2
  },

  deleteButton: {
    backgroundColor: '#dc143c',
  },

  updateButton: {
    backgroundColor: '#ffc82d'
  },

  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  },

  titleLoading: {
    color: '#3CDC8C',
    fontSize: 30,
    fontFamily: 'Nunito_800ExtraBold'
  },

  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})