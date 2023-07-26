import * as React from 'react';
import { Button, View, Text, ScrollView, StyleSheet, 
  TouchableHighlight, TouchableOpacity, TextInput, StatusBar, LogBox, Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import db from './src/sahih_bukhari.json';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import SelectDropdown from 'react-native-select-dropdown'

const SettingContext = React.createContext();

function Setting(props){
  const [fontSize,setFontSize] = React.useState(16);
  const [defaultFontFamily,setDefaultFontFamily] = React.useState('Times New Roman');
  const [defaultColor,setDefaultColor] = React.useState('black');
  const [defaultBgColor,setDefaultBgColor] = React.useState('#faebd7');

  let setting = {
    fontSize,
    setFontSize,
    defaultFontFamily,
    setDefaultFontFamily,
    defaultColor,
    setDefaultColor,
    defaultBgColor,
    setDefaultBgColor,
  }

  return (
    <SettingContext.Provider value={setting}>
      {props.children}
    </SettingContext.Provider>
  )
}

function SettingPage({navigation}){
  const { 
    fontSize, setFontSize,
    defaultFontFamily, setDefaultFontFamily,
    defaultColor, setDefaultColor,
    defaultBgColor, setDefaultBgColor
   } = React.useContext(SettingContext);

  const [size,setSize] = React.useState(fontSize);
  const [slideCompletionValue, setSlideCompletionValue] = React.useState(16);
  const [slideCompletionCount, setSlideCompletionCount] = React.useState(0);
  const [fontFamily,setFontFamily] = React.useState([
    'Times New Roman',
    'Helvetica',
    'Verdana',
    "Georgia",
  ])
  const [selectedFontFamily,setSelectedFontFamily] = React.useState(fontFamily[0]);
  const [colors,setColors] = React.useState([
    "black","white","gray","blue","green","blueviolet",
    "cornflowerblue","darkblue","darkmagenta","dodgerblue","darkslateblue",
    "deepskyblue","indigo","lightseagreen"
  ])
  const [color,setColor] = React.useState('black')

  const [bgcolors,setbgColors] = React.useState([
    "#faebd7","white","black","gray","blue","green","blueviolet",
    "cornflowerblue","darkblue","darkmagenta","dodgerblue","darkslateblue",
    "deepskyblue","indigo","lightseagreen"
  ])
  const [bgcolor,setbgColor] = React.useState('#faebd7');
  const [success,setSuccess] = React.useState(false);

  async function updateSetting(){
    setFontSize(size)
    setDefaultFontFamily(selectedFontFamily)
    setDefaultColor(color)
    setDefaultBgColor(bgcolor)
    setSuccess(true)
    return navigation.goBack()
  }

  async function resetSetting(){
    setFontSize(16)
    setDefaultFontFamily('Times New Roman')
    setDefaultColor('black')
    setDefaultBgColor('#faebd7')
    setSuccess(false)
    Alert.alert('Success','Settings changed to default')
    return navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:() => <FontAwesome onPress={resetSetting} name="refresh" size={24} color={defaultColor} style={{marginRight:10}} />
    })
  },[navigation])

  return (
    <ScrollView style={[styles.container,{alignContent:'center',backgroundColor:defaultBgColor}]}>
      <Text style={[styles.volumeHeader,{fontSize:parseInt(slideCompletionValue),fontFamily:selectedFontFamily,color:color,marginTop:10}]}>Font Size: {parseInt(fontSize)}px</Text>
      <Text style={[styles.volumeHeader,{fontSize:parseInt(slideCompletionValue),fontFamily:selectedFontFamily,color:color}]}>
        {slideCompletionValue && parseInt(slideCompletionValue)}px
        </Text>
      <Slider
        style={{width: 300, height: 40, alignSelf:'center'}}
        minimumValue={10}
        maximumValue={40}
        minimumTrackTintColor="#0000ff"
        maximumTrackTintColor="#000000"
        value={fontSize}
        onSlidingComplete={value => {
          setSlideCompletionValue(value);
          setSlideCompletionCount(prev => prev + 1);
          setSize(value)
        }}
      />
      <Text style={[styles.volumeHeader,{fontSize:parseInt(slideCompletionValue),fontFamily:selectedFontFamily,color:color,marginTop:10}]}>Font Family:</Text>
     <View style={{alignItems:'center'}}>
     <SelectDropdown
      defaultValue={selectedFontFamily}
        data={fontFamily}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          setSelectedFontFamily(selectedItem)
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
     </View>
       <Text style={[styles.volumeHeader,{fontSize:parseInt(slideCompletionValue),fontFamily:selectedFontFamily,color:color,marginTop:10}]}>Text Color:</Text>
      <View style={{alignItems:'center'}}>
      <SelectDropdown
      defaultValue={color}
        data={colors}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          setColor(selectedItem)
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      </View>

       <Text style={[styles.volumeHeader,{fontSize:parseInt(slideCompletionValue),fontFamily:selectedFontFamily,color:color,marginTop:10}]}>Background Color:</Text>
       <View style={{alignItems:'center'}}>
       <SelectDropdown
      defaultValue={bgcolor}
        data={bgcolors}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          setbgColor(selectedItem)
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
       </View>

      <TouchableOpacity 
      onPress={updateSetting}
      style={styles.settingButton}>
        <Text style={styles.settingText}>
          {
            success ? 'Saved' : 'Save'
          }
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

function Book({ navigation, route }) {
  const { books } = route.params;
  const { 
    fontSize, setFontSize,
    defaultFontFamily, setDefaultFontFamily,
    defaultColor, setDefaultColor,
    defaultBgColor, setDefaultBgColor
   } = React.useContext(SettingContext);

   React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight:() => <AntDesign onPress={() => navigation.navigate('Setting')} name="setting" size={24} color="black" style={{marginRight:10}} />
    })
  },[navigation])

  return (
    <ScrollView style={[styles.container,{backgroundColor:defaultBgColor}]}>
      <StatusBar barStyle={'dark-content'} />
      {
        books?.books?.map((hadith,index) => (
          <View key={index}>
          {hadith?.hadiths?.map((h,i) => (
            <View key={i}>
              <Text style={[styles.header,{fontSize:fontSize,fontFamily:defaultFontFamily,color:defaultColor}]}>{h.info}</Text>
              <Text style={[styles.subHeader,{fontSize:fontSize,fontFamily:defaultFontFamily,color:defaultColor}]}>{h.by}</Text>
              <Text style={[styles.body,{fontSize:fontSize,fontFamily:defaultFontFamily,color:defaultColor}]}>{h.text}</Text>
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
  const { 
    fontSize, setFontSize,
    defaultFontFamily, setDefaultFontFamily,
    defaultColor, setDefaultColor,
    defaultBgColor, setDefaultBgColor
   } = React.useContext(SettingContext);

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
      headerTitle:() => <TextInput onChangeText={(text) => filterData(text)} autoCorrect={false} style={styles.input} placeholder='Search..' />,
      headerRight:() => <AntDesign onPress={() => navigation.navigate('Setting')} name="setting" size={24} color="black" style={{marginRight:10}} />
    })
  },[navigation])

  return (
    <ScrollView style={[styles.container,{backgroundColor:defaultBgColor}]}>
      <StatusBar barStyle={'dark-content'} />
      {
        data?.map((volume,index) => (
          <View key={index}>
            <Text style={[styles.volumeHeader,{fontSize:fontSize,fontFamily:defaultFontFamily,color:defaultColor}]}>{volume.name}</Text>
            <View>
              {
                volume.books.map((book,i) => (
                  <TouchableHighlight 
                  underlayColor={'#20b2aa'}
                  style={styles.button}
                  onPress={() => navigation.navigate(`${book.name}`,{books:volume})}
                  key={i}>
                    <Text style={{fontSize:fontSize,fontFamily:defaultFontFamily,color:defaultColor}}>{book.name}</Text>
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

function DrawerScreen(){
  const { 
    fontSize, setFontSize,
    defaultFontFamily, setDefaultFontFamily,
    defaultColor, setDefaultColor,
    defaultBgColor, setDefaultBgColor
   } = React.useContext(SettingContext);
  
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      primary: defaultBgColor,
      background: defaultBgColor,
      card: 'rgb(255, 255, 255)',
      text: defaultColor,
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
    fontSize:fontSize,
  };
  return (
    <NavigationContainer theme={MyTheme}>
    <Drawer.Navigator 
    initialRouteName="Home"
    screenOptions={{
      headerStyle:{
        backgroundColor:defaultBgColor
      }
    }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {
        db.map((books,index) => (
          <Drawer.Group key={index}>
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
      <Drawer.Screen name="Setting" component={SettingPage} />
    </Drawer.Navigator>
  </NavigationContainer>
  )
}

export default function App() {

 

  React.useEffect(() => {
    LogBox.ignoreAllLogs()
  },[])

  return (
    <Setting>
      <DrawerScreen />
    </Setting>
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
  },
  settingButton:{
    padding:20,
    backgroundColor:'mediumblue',
    borderRadius:10,
    width:200,
    marginTop:50,
    alignSelf:'center'
  },
  settingText:{
    fontSize:16,
    color:'#fff',
    textAlign:'center'
  }
})