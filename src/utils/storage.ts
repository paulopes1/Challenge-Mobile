import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_USER = '@xp_app_user';

export const saveUser = async (user: { username: string }) => {
  try {
    await AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
    return true;
  } catch (e) {
    console.error('saveUser error', e);
    return false;
  }
};

export const getUser = async () => {
  try {
    const s = await AsyncStorage.getItem(KEY_USER);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.error('getUser error', e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(KEY_USER);
    return true;
  } catch (e) {
    console.error('removeUser error', e);
    return false;
  }
};
