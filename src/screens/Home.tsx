import React, { useState, useEffect } from 'react';
import {
  
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [history, setHistory] = useState<any>([]);

  const API_KEY = 'da96ae04782b2b0aa6fd7ad048a976f9';

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load history', error);
    }
  };

  const saveHistory = async (newHistory:any) => {
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history', error);
    }
  };

  const fetchWeather = async (cityName:any) => {
    if (!cityName) {
      Alert.alert('Error', 'Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = response.data;

      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
      });

      const updatedHistory = [data.name, ...history.filter((item:any) => item !== data.name)].slice(
        0,
        5
      );
      setHistory(updatedHistory);
      saveHistory(updatedHistory);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={() => fetchWeather(city)} />

      {weather && (
        <WeatherCard
          city={weather.city}
          temperature={weather.temperature}
          description={weather.description}
          humidity={weather.humidity}
          icon={weather.icon}
        />
      )}

      <Text style={styles.historyTitle}>Search History</Text>
     {history.map((item:any, index:any) => (
        <TouchableOpacity key={index} onPress={() => fetchWeather(item)}>
          <Text style={styles.historyItem}>{item}</Text>
        </TouchableOpacity>
      ))} 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  historyItem: {
    fontSize: 16,
    color: '#007BFF',
    marginVertical: 5,
  },
});

export default HomeScreen;



