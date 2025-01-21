import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherCard = ({ city, temperature, description, humidity, icon }:any) => {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.humidity}>Humidity: {humidity}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  humidity: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default WeatherCard;

