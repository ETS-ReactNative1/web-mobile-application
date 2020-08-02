import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  FlatList,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const FarmersList = (props) => {
  //let token = await AsyncStorage.getItem(token)
  const [farmData, setFarmData] = React.useState({ data: [] });
 //console.log("GET FARMER LIST--->", farmData.data);

  const getAllFarmers = async () => {
    try {
      /*=======Get the Token from asyncStorage ========*/
      let token = await AsyncStorage.getItem(token);
      console.log("ASYNC STORAGE =====", token);
      /*=======Axios Fetch to Get All Farmers ========*/
      let result = await axios.get("/customers/farmer", {
        headers: { Authorization: token },
      });
      console.log(" from web back =======", result);
      setFarmData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /*======== use effect  By default, it runs both after the first render and after every update  ========*/
  useEffect(() => {
    getAllFarmers();
  }, []);
/*=======Send singl farm data to get  product details to ProductsList component =====*/
  const productDetail = (item) => {
    console.log("From farmers list  what is in the item", item);
    props.navigation.navigate("ProductsList", { data: item });
  };
/*=========Iterate in the farmData which is farmers array  send single farmer data to ProductsList component ============ */
  return (
    <View style={styles.container}>
      <Text style={{color:'brown', margin:20, fontSize:20, fontFamily:'timenewroman'}}>WelCome to Famers List</Text>
      <>
        <FlatList
        style={styles.farmList}
        contentContainerStyle={styles.farmstyle}
          data={farmData}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                productDetail(item);
              }}>
              <View style={styles.farmers}>
                <Text>{item.farmName}</Text>
                <View style={styles.menuBox}>
                <Image style={styles.menuBox} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSknAvcz_6xk6FbkgmRCPgw_j3KpNJ6nBUVUw&usqp=CAU'}}/>
                <Text >98% Like</Text>
              </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => {
            item._id;
          }}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    padding: 30,
  },
  farmList: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6" 
  },
  farmstyle:{
    alignItems:'center'
  },
  farmers: {
    marginTop: 24,
    padding: 40,
    backgroundColor: "white",
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: "center",
    color:"brown",
  },
  
  button: {
    height: 20,
    flexDirection: "row",
    backgroundColor: "blue",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "blue",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:85,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-3
    },
    elevation:4,
  },
  icon: {
    width:20,
    height:20,
  },
  info:{
    fontSize:22,
    color: "#696969",
  }
 
});
export default FarmersList;


/**================== ScrollView ====================**/
// return(
//     <View key={farm.key}>
//         <Text style={styles.farmers}> {farm.farmName} </Text>
//          </View>
//         )
// }) :<Text> No Farmers today go Home !!! </Text> }

{
  /* <View>
      <View style={styles.container}>
        <Text>welcom Farmers List</Text>
      
        <ScrollView>
           {farmData ?  farmData.map((farm) => {
              return (
                <TouchableOpacity style={styles.button} onPress={getAllFarmers}>
                <Text style={styles.buttonText}>Farm List</Text>
              </TouchableOpacity>
                <View key={farm._id}>
                  <Text style={styles.farmers}> {farm.farmName} </Text>

                  <TouchableOpacity style={styles.button} onPress={()=>productDetail(farm)}>
              <Text style={styles.buttonText}>products</Text>
            </TouchableOpacity>
                </View>
              );
              }) : <Text> No Farmers today go Home !!! </Text>}
          
        </ScrollView>
      </View>
    </View>
  ); */
}
