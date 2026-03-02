// storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a key-value pair
 */
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('AsyncStorage save error:', error);
    return false;
  }
};

/**
 * Retrieve data by key
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('AsyncStorage get error:', error);
    return null;
  }
};

/**
 * Remove a key
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('AsyncStorage remove error:', error);
    return false;
  }
};