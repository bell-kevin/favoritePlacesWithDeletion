import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, Button } from 'react-native';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init, deleteFirstPlace } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    init()
      .then(() => {
        setDbInitialized(true);
        SplashScreen.hideAsync();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleDeleteFirstPlace = (onSuccess) => {
    deleteFirstPlace()
      .then(() => {
        console.log('First place deleted from database');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // ...
  
  function DeletePlace({ navigation }) {
    const handleDelete = () => {
      handleDeleteFirstPlace(() => {
        navigation.goBack();
      });
    };
  
    return (
      <View>
        <Text>Do you want to delete the first favorite place?</Text>
        <Button title="Delete" onPress={handleDelete} />
      </View>
    );
  }

  if (!dbInitialized) {
    return null; // Return null instead of <AppLoading />
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <>
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('AddPlace')}
                  />
                  <IconButton
                    icon="trash"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('DeletePlace')}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="DeletePlace"
            component={DeletePlace}
            options={{
              title: 'Delete a Place',
            }}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a new Place',
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: 'Loading Place...',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function DeletePlace() {
  return (
    <View>
      <Text>Do you want to delete the first favorite place?</Text>
      <Button title="Delete" onPress={handleDeleteFirstPlace} />
    </View>
  );
}
