import { ThemedText } from "../../components/ThemedText";
import { useCallback, useEffect, useState } from "react";
import { ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-paper";
import { clear_storage } from "../../constants/helper";
import { router, useFocusEffect } from "expo-router";
import { connect } from "react-redux";
import { clearLogin, getMyDetails } from "../../store/action/common/authAction";

function TabTwoScreen(props:any) {
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [me, setMe] = useState<any>({});

  useFocusEffect(
    useCallback(() => {
      getName();
      props.getMyDetails_();
      props.clearLogin_();
    }, [])
  );
  useEffect(() => {
    if (props.me && props.me.user) {
      setMe(props.me.user);
    }
  }, [props.me]);
  useEffect(() => {
    props.getMyDetails_();
  }, [modalVisible]);
  const getName = async () => {
    const fName = await SecureStore.getItemAsync('firstName');
    const lName = await SecureStore.getItemAsync('lastName');
    if (fName || lName) {
      setName(fName + ' ' + lName);
    }
  };

  const logout = async () => {
    await clear_storage();
    router.push('/Pages/login');
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
          source={require('../../assets/images/profileBg.png')}
          style={{ flex: 1}}
        >
          <ThemedText style={{ color: 'black', fontSize: 20, textAlign: 'center', marginTop: 210, fontWeight:"600" }}>Hi, {name}</ThemedText>

          <ThemedText style={{ color: 'black', fontSize: 14, textAlign: 'center', marginTop: 5, fontWeight:"200" }}>Joined Date: {new Date(me?.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</ThemedText>
          <View style={styles.card}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom: 25 }} onPress={()=>{setModalVisible(true)}}>
              <Icon
                source={'web'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>View My Details</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
            />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom: 25 }} onPress={()=>router.push("/Pages/ChangePassword")}>
              <Icon
                source={'lock-outline'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>Change Password</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={logout}>
              <Icon
                source={'logout'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>Logout</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
            />
            </TouchableOpacity>
          </View>
          <ThemedText style={{ color: 'black', fontSize: 15, textAlign: 'left', marginLeft: 20 }}>More</ThemedText>

          <View style={styles.card}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom: 25 }} onPress={()=>{router.push({pathname: "https://visionfundindia.in/contact-us/" })}}>
              <Icon
                source={'help-circle-outline'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>Help & Support</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }} onPress={()=>{router.push({pathname: "https://visionfundindia.in/faq"})}}>
              <Icon
                source={'chat-question-outline'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>FAQ</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
            />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between',marginBottom: 25 }} onPress={()=>{router.push({pathname: "https://visionfundindia.in/privacy-policy" })}}>
              <Icon
                source={'shield-alert-outline'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>Privacy Policy</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
            />
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={()=>{router.push({pathname: "https://visionfundindia.in/terms-and-conditions"})}}>
              <Icon
                source={'file-document-edit-outline'}
                size={18}
                color={'light'}
              />
              <ThemedText style={{ color: 'black', fontSize: 14, fontWeight:"500" }}>Terms & Conditions</ThemedText>
              <Icon
                source={'chevron-right'}
                size={18}
                color={'light'}
            />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>


            {/* Editable information section */}
            <View style={styles.infoSection}>
              <Text style={styles.label}>YOUR NAME</Text>
              <Text
                style={styles.input}
              > {me.firstName + " " + me.lastName}</Text>

              <Text style={styles.label}>YOUR {me.role === "customer" ? "LOCATION" : "DEPARTMENT"}</Text>
              <Text
                style={styles.input}
              > {me.role === "customer" ? me.location?.name : me.departmentId?.name}</Text>

              <Text style={styles.label}>YOUR {me.role === "customer" ? "CENTER" : "DESIGNATION"}</Text>
              <Text
                style={styles.input}
              > {me.role === "customer" ? me.centre?.name : me.designationId?.name}</Text>

              <Text style={styles.label}>YOUR {me.role === "customer" ? "GROUP" : "BRANCH"}</Text>
              <Text
                style={styles.input}
              > {me.role === "customer" ? me.group?.name : me.branchId?.name}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const mapStateToProps = (state: any) => ({
  me: state.me?.response,
});

const mapDispatchToProps = (dispatch: any) => ({
  getMyDetails_: () => dispatch(getMyDetails()),
  clearLogin_: () => dispatch(clearLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(TabTwoScreen);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 70,
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  closeButton: {
    marginVertical: "auto",
    backgroundColor: "#737373",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 400,

  },
  closeText: {
    fontSize: 18,
    color: 'white',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 20,
  },
  actionText: {
    fontSize: 16,
    color: 'orange',
    marginVertical: 5,
    textAlign: 'center',
  },
  infoSection: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});