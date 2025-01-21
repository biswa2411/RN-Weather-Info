import { SafeAreaView, StyleSheet } from "react-native"
import Home from "./screens/Home"

const App = ()=>{
return(
  <SafeAreaView style={styles.container}>
    <Home/>
  </SafeAreaView>
)


}

const styles =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#f5f5f5"
  }
})
export default App;
