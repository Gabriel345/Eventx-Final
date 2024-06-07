// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, StyleSheet, Button, Animated, Dimensions, Linking } from 'react-native';
// import { Camera } from 'expo-camera';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// function Scanner() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const animation = useRef(new Animated.Value(0)).current;
//   const { width, height } = Dimensions.get('window');

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   useEffect(() => {
//     const animateScanner = Animated.loop(
//       Animated.sequence([
//         Animated.timing(animation, {
//           toValue: 200,
//           duration: 1000,
//           useNativeDriver: true
//         }),
//         Animated.timing(animation, {
//           toValue: 0,
//           duration: 1000,
//           useNativeDriver: true
//         })
//       ])
//     );
//     animateScanner.start();
//     return () => animateScanner.stop();
//   }, [animation]);

//   const handleBarCodeScanned = ({ type, data }) => {
//     setScanned(true);
//     if (data.startsWith('https://') || data.startsWith('https://')) {
//       Linking.openURL(data);
//     } 
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission...</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         type={Camera.Constants.Type.back}
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.unfocusedContainer}></View>
//           <View style={[styles.focusedContainer, { width: width - 40, height: height - 40 }]}>
//             <View style={styles.unfocusedContent}></View>
//             <View style={styles.focusArea}>
//               <Animated.View
//                 style={[
//                   styles.animationLine,
//                   {
//                     transform: [{ translateY: animation }]
//                   }
//                 ]}
//               />
//             </View>
//             <View style={styles.unfocusedContent}></View>
//           </View>
//           <View style={styles.unfocusedContainer}></View>
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button
//             title={scanned ? 'Tap to Scan Again' : 'Start Scanning'}
//             onPress={() => setScanned(false)}
//           />
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   overlay: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   focusedContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   unfocusedContent: {
//     flex: 1,
//   },
//   focusArea: {
//     width: 200,
//     height: 200,
//     borderWidth: 2,
//     borderColor: 'white',
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   animationLine: {
//     height: 2,
//     width: '100%',
//     backgroundColor: 'red'
//   },
//   buttonContainer: {
//     backgroundColor: 'transparent',
//     padding: 10,
//   },
// });

// export default Scanner;