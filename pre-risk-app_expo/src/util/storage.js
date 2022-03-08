import AsyncStorage from '@react-native-async-storage/async-storage';

export async function asyncGet(name) {

    const json_data = await AsyncStorage.getItem(name)

    return JSON

}

export async function asyncSet(name, data) {

    const json_data = JSON.stringify(data)

    await AsyncStorage.setItem(name, json_data)

}


export function set(name, data) {

    const json_data = JSON.stringify(data)

    AsyncStorage.setItem(name, json_data)

}