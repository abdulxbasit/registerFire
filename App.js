import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Input,
  Text,
  Button,
  Icon,
  IconRegistry,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ImagePicker from 'react-native-image-crop-picker';


const PersonIcon = props => <Icon {...props} name="person-outline" />;
const PinIcon = props => <Icon {...props} name="pin-outline" />;
const EmailIcon = props => <Icon {...props} name="email-outline" />;
const PhoneIcon = props => <Icon {...props} name="phone-outline" />;
const PasswordIcon = props => <Icon {...props} name="lock-outline" />;

export default function App() {
  const handleLogin = async () => {
    try {
      createUser = await auth()
        .createUserWithEmailAndPassword(
          email,
          pass,
        )
        .then(() => {
          alert('User account created & signed in!');
          
        })

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      }
      console.log(error);
      seterrmessage(error.code)
    }
  };

  useEffect(() => {
    getdatabase();
  }, []);
  const getdatabase = async () => {
    try {
      const data = await firestore()
        .collection('testing')
        .doc(user.uid)
        .get();

      console.log(data._data);
      setmydata(data._data);
      adddatabase;
    } catch (error) {
      console.log(error);
      
    }
  };
  const adddatabase = async () => {
    try {
      firestore()
      .collection('testing')
      .doc(user.uid)
      .set({
        name: name,
        age: age,
        phone: phone,
        address: address,
      })
      .then(() => {
        console.log('User added!');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [source, setsource] = useState();
  
  const [name, setname] = useState('');
  const [pass, setpass] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');
  const [age, setage] = useState('');
  const [mydata, setmydata] = useState(null);
  const [errmessage, seterrmessage] = useState(null);
  const reference = storage().ref('black-t-shirt-sm.png');
  const url = storage().ref('black-t-shirt-sm.png').getDownloadURL();
  const user = firebase.auth().currentUser;
  openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setsource(imageUri);
    });
  };
  // const uploadImage = async () => {
  //   const { uri } = source1;
  //   const filename = "profile-image"
  //   setuploading(true);
  //   settransferred(0);
  //   const task = storage()
  //     .ref(filename)
  //     .putFile(uploadUri);
  //   // set progress state
  //   task.on('state_changed', snapshot => {
  //     settransferred(
  //       Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //     );
  //   });
  //   try {
  //     await task;
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setuploading(false);
  //   Alert.alert(
  //     'Photo uploaded!',
  //     'Your photo has been uploaded to Firebase Cloud Storage!'
  //   );
  //   source(null);
  // };
  // const submitPost = async () => {
  //   const uploadUri = source;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/')+1);
  //   setuploading(true);
  //   try {
  //     await storage().ref(filename).putFile(uploadUri);
  //     setuploading(false);
  //     Alert.alert(
  //       'Image Uploaded!',
  //       'Your Image has been uploaded to the FireBase Cloud Storage.'
  //     )
      
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }


  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <ScrollView style={styles.mainview}>
          <Text category="h1">Create an Account</Text>
          <View style={styles.imgview}>
            <Image source={{uri: source}} style={styles.profileimg} />
            <TouchableOpacity
              style={styles.gallerybutton}
              onPress={openGallery}>
              <Icon style={styles.icon} fill="#000000" name="image-outline" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputview}>
            <Input
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={nextValue => setname(nextValue)}
              accessoryRight={PersonIcon}
            />

            <Input
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={nextValue => setemail(nextValue)}
              accessoryRight={EmailIcon}
            />
            <Input
              style={styles.input}
              placeholder="Create Password"
              value={pass}
              onChangeText={nextValue => setpass(nextValue)}
              accessoryRight={PasswordIcon}
            />
            <Input
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Age"
              value={age}
              onChangeText={nextValue => setage(nextValue)}
            />
            <Input
              style={styles.input}
              placeholder="Phone No"
              keyboardType="number-pad"
              value={phone}
              onChangeText={nextValue => setphone(nextValue)}
              accessoryRight={PhoneIcon}
            />
            <Input
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={nextValue => setaddress(nextValue)}
              accessoryRight={PinIcon}
            />
          </View>
          
          <Button
          style={{marginVertical:5}}
          onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = source;
          // uploads file
          await reference.putFile(pathToFile);
          const url = await storage().ref('images/profile-1.png').getDownloadURL();
        }}
          >
            <Text>Upload Image</Text>
          </Button>
          <Button 
          style={{marginVertical:5}}
          onPress={adddatabase}>
            <Text>Add Data to firebase</Text>
          </Button>
          <Button 
          style={{marginVertical:5}}
          onPress={handleLogin}>
            <Text>Create Account</Text>
          </Button>
          <Text style={{color:'grey', alignSelf:'center', marginTop:10,}}>{errmessage}</Text>
          <Text category="h1">Welcome </Text>
          <Text>Name: {mydata ? mydata.name : 'Loading...'}</Text>
          <Text>{user.email}</Text>
          <Text>Age: {mydata ? mydata.age : 'Loading...'}</Text>
          <Text>Phone No: {mydata ? mydata.phone : 'Loading...'}</Text>
          <Text>Address : {mydata ? mydata.address : 'Loading...'}</Text>
          <Text>Unique User Id: {user.uid}</Text>
          <Text category="h6">Profile Picture </Text>
          <Image source={{uri:'https://firebasestorage.googleapis.com/v0/b/registerfire-b9a3b.appspot.com/o/black-t-shirt-sm.png?alt=media&token=bf5c0248-9048-43ae-9ee6-25d6fad366cd'}} style={{width:200, height:200, borderRadius:20,}}></Image>
        </ScrollView>
      </ApplicationProvider>
    </>
  );
}
const styles = StyleSheet.create({
  mainview: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  inputview: {
    marginTop: 20,
  },
  input: {
    marginVertical: 5,
  },
  imgview: {
    marginHorizontal: 100,
    marginVertical: 20,
  },
  profileimg: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
  icon: {
    width: 25,
    height: 25,
  },
  gallerybutton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffffaa',
    padding: 10,
    borderRadius: 30,
  },
});
