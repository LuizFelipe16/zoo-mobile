import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import api from '../Services/api';
import { useNavigation, useRoute } from '@react-navigation/native';

interface AnimalDetailsRouteParams {
  id: number;
}

export default function OrphanageData() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [about, setAbout] = useState('');
  const [nationality, setNationality] = useState('');
  const [age, setAge] = useState('');
  const [savage, setSavage] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const navigation = useNavigation();

  async function handleCreateAnimal() {

    const data = new FormData();

    data.append('name', name);
    data.append('nickname', nickname);
    data.append('about', about);
    data.append('nationality', nationality);
    data.append('age', age);
    data.append('savage', String(savage));

    images.forEach((image, index) => {
      data.append('images', {
        name: `imageZoo!_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    });

    await api.post('/animals', data);

    navigation.navigate('ListAnimals');
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Ops... Para você escolher uma foto do animal, precisa dar permissão para o Zoo! acessar sua galeria.')
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([ ...images, image ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados do Animal</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Apelido</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Nacionalidade</Text>
      <TextInput
        style={styles.input}
        value={nationality}
        onChangeText={setNationality}
      />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
      />

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => {
          return (
            <Image 
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage} 
            />
          )
        })}
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>É um animal selvagem?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#CAFFFB', true: '#dc143c' }}
          value={savage}
          onValueChange={setSavage}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateAnimal}>
        <Text style={styles.nextButtonText}>Colocar no Zoo!</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32BF84'
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#fff'
  },

  label: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#fff',
  },

  input: {
    backgroundColor: '#fAFFFB',
    borderWidth: 1,
    borderColor: '#f2f3f5',
    borderRadius: 10,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadedImagesContainer: {
    flexDirection: 'row'
  },

  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 28,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#fff',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
    elevation: 2
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 17,
    color: '#32BF84',
  }
})