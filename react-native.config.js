module.exports = {
  dependencies: {
    "@react-native-community/async-storage": {
      platforms: {
        android: null,
        ios: null, // disable Android platform, other platforms will still autolink
      }
    },
    "react-native-gesture-handler": {
      platforms: {
        android: null,
        ios: null, // disable Android platform, other platforms will still autolink
      }
    },
    "react-native-svg": {
      platforms: {
        android: null // disable Android platform, other platforms will still autolink
      }
    },
    "native-base": {
      platforms: {
        android: null // disable Android platform, other platforms will still autolink
      }
    },
    "react-native-vector-icons": {
      platforms: {
        android: null // disable Android platform, other platforms will still autolink
      }
    }
  }
};
