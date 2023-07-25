import * as React from 'react';
import { Button, View, Text, ScrollView, StyleSheet, 
  TouchableHighlight, TouchableOpacity, TextInput, StatusBar, LogBox } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import db from './src/sahih_bukhari.json';

function Book({ navigation, route }) {
  const { books } = route.params;
  console.log(books)
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {
        books?.books?.map((hadith,index) => (
          <View key={index}>
          {hadith?.hadiths?.map((h,i) => (
            <View key={i}>
              <Text style={styles.header}>{h.info}</Text>
              <Text style={styles.subHeader}>{h.by}</Text>
              <Text style={styles.body}>{h.text}</Text>
          </View>
          ))}
          </View>
        ))
      }
    </ScrollView>
  );
}

function HomeScreen({ navigation }) {
  const [data,setData] = React.useState([...db]);
  const [originalData,setOriginalData] = React.useState([...db]);

  function filterData(text){
    if (text) {
      let upperQuery = text.toUpperCase()
      let dataArray = []
      let context = ''
    originalData.filter((volume) => {
      volume.books.forEach((book) => {
        context += book.name
        book.hadiths.forEach((hadith) => {
          context += hadith.by + hadith.info + hadith.text
        })
      })
      let upperContext = context.toUpperCase()
      if (upperContext.includes(upperQuery)) {
        dataArray.push(volume)
      }
    })
    setData(dataArray)
    }else{
      setData(originalData)
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:() => <TextInput onChangeText={(text) => filterData(text)} autoCorrect={false} style={styles.input} placeholder='Search..' />
    })
  },[navigation])

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {
        data?.map((volume,index) => (
          <View key={index}>
            <Text style={styles.volumeHeader}>{volume.name}</Text>
            <View>
              {
                volume.books.map((book,i) => (
                  <TouchableHighlight 
                  underlayColor={'#20b2aa'}
                  style={styles.button}
                  onPress={() => navigation.navigate(`${book.name}`,{books:volume})}
                  key={i}>
                    <Text>{book.name}</Text>
                  </TouchableHighlight>
                ))
              }
            </View>
          </View>
        ))
      }
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  React.useEffect(() => {
    LogBox.ignoreAllLogs()
  },[])

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerStyle:{
          backgroundColor:'#faebd7'
        }
      }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        {
          db.map((books) => (
            <Drawer.Group>
              {
              books.books.map((book,i) => (
                <Drawer.Screen 
                  key={i} 
                  name={book.name} 
                  component={Book} 
                  options={{ headerTitle:book.name }} 
                  initialParams={{books}} />
              ))
             }
            </Drawer.Group>
          ))
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'#faebd7'
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
    paddingTop:10,
    paddingBottom:10,
    textDecorationLine:'underline'
  },
  volumeHeader:{
    fontSize:20,
    fontWeight:'bold',
    paddingTop:10,
    paddingBottom:10,
    textDecorationLine:'underline',
    textAlign:'center'
  },
  subHeader:{
    fontSize:18,
    fontWeight:'800'
  },
  body:{
    fontSize:18
  },
  button:{
    padding:20,
    borderColor:'#1e90ff',
    borderWidth:0.3,
    marginBottom:5
  },
  input:{
    borderWidth:0.3,
    width:220,
    padding:10,
    borderRadius:5
  }
})