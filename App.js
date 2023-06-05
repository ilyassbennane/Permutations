import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ProfessorList from './components/ProfessorList';
import SearchResult from './components/SearchResult';
import Apropos from './components/Apropos';
import Accueil from './components/Accueil';
import LoginScreen from './components/Login';
import Registration from './components/Register';
import { View, Text, Button } from 'react-native'; // Added Button import
import DeleteUser from './components/DeleteUser';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to delete the professor from the server
      await fetch(`https://troubled-red-garb.cyclic.app/professeurs/${userEmail}`, {
        method: 'DELETE',
      });

      // The professor has been successfully deleted
      // Do something with the server response, such as displaying a success message or redirecting the user
      console.log({ userEmail });
      setIsLoggedIn(false);
    } catch (error) {
      // An error occurred while deleting the professor
      // Handle the error, such as displaying an error message to the user
      console.error('Error deleting professor:', error);
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator drawerPosition="right">
          <Drawer.Screen name="Combinaison" component={ProfessorList} />
          <Drawer.Screen name="Accueil" component={Accueil} />
          <Drawer.Screen name="Rechercher" component={SearchResult} />
          <Drawer.Screen name="A propos" component={Apropos} />
          <Drawer.Screen name="Delete My Account">
  {() => <DeleteUser handleDelete={handleDelete} />}
</Drawer.Screen>

          <Drawer.Screen name="Logout" options={{ title: 'Logout' }}>
  {() => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )}
</Drawer.Screen>
        </Drawer.Navigator>
      ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
            </Stack.Screen>
            <Stack.Screen name="Registration" component={Registration} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}
