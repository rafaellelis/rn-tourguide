import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  TourGuideProvider,
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController,
} from './src'

const uri =
  'https://pbs.twimg.com/profile_images/1223192265969016833/U8AX9Lfn_400x400.jpg'

// Add <TourGuideProvider/> at the root of you app!
function App() {
  return (
    <TourGuideProvider {...{ borderRadius: 16, androidStatusBarVisible: true }}>
      <AppContent />
    </TourGuideProvider>
  )
}

const Init = () => {
  const { start, canStart, stop, TourGuideZone } =
    useTourGuideController('Init')

  React.useEffect(() => {
    console.log('Init mounted', canStart)
    // start at mount
    if (canStart) {
      start()
    }
  }, [canStart])

  return (
    <View style={styles.middleView}>
      <TourGuideZone
        keepTooltipPosition
        zone={1}
        text={'A react-native-copilot remastered! 🎉'}
        borderRadius={16}
      >
        <Text style={styles.title}>{'THIS IS THE INIT'}</Text>
      </TourGuideZone>
      <TourGuideZone
        keepTooltipPosition
        zone={2}
        text={'A react-native-copilot remastered! 🎉'}
        borderRadius={16}
      >
        <Text style={styles.title}>{'A DIFFERENT COMPONENT TO TEST'}</Text>
      </TourGuideZone>
    </View>
  )
}

const Tab = ({ value }) => {
  // Use Hooks to control!
  const { start, canStart, stop, TourGuideZone } = useTourGuideController(value)

  React.useEffect(() => {
    console.log(value, 'mounted', canStart)
    // start at mount
    if (canStart) {
      start()
    }
  }, [canStart]) // wait until everything is registered

  return (
    <View style={styles.middleView}>
      <TourGuideZone
        keepTooltipPosition
        zone={1}
        text={'A react-native-copilot remastered! 🎉'}
        borderRadius={16}
      >
        <Text style={styles.title}>{value}</Text>
      </TourGuideZone>
      <TourGuideZone zone={2}>
        <TouchableOpacity style={styles.button} onPress={() => start()}>
          <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
        </TouchableOpacity>
      </TourGuideZone>

      <TourGuideZone zone={3}>
        <TouchableOpacity style={styles.button} onPress={() => start(4)}>
          <Text style={styles.buttonText}>Step 4</Text>
        </TouchableOpacity>
      </TourGuideZone>
      <TouchableOpacity style={styles.button} onPress={() => start(2)}>
        <Text style={styles.buttonText}>Step 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={stop}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TourGuideZone
        zone={4}
        shape='circle'
        text={'With animated SVG morphing with awesome flubber 🍮💯'}
      >
        <Image source={{ uri }} style={styles.profilePhoto} />
      </TourGuideZone>
    </View>
  )
}

const AppContent = () => {
  const iconProps = { size: 40, color: '#888' }

  const [value, setValue] = React.useState(0)

  return (
    <View style={styles.container}>
      {/* Use TourGuideZone only to wrap */}
      {value === 0 && (
        <View style={styles.middleView}>
          <Text style={styles.title}>{'View 0'}</Text>
        </View>
      )}
      {value === 1 && <Tab value='View 1' />}
      {value === 2 && <Tab value='View 2' />}
      {value === 3 && <Tab value='View 3' />}
      {value === 4 && <Init />}
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonIcon} onPress={() => setValue(0)}>
          <Ionicons name='ios-add-circle' {...iconProps} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonIcon} onPress={() => setValue(1)}>
          <Ionicons name='ios-chatbubbles' {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIcon} onPress={() => setValue(2)}>
          <Ionicons name='ios-globe' {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIcon} onPress={() => setValue(3)}>
          <Ionicons name='ios-navigate' {...iconProps} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonIcon} onPress={() => setValue(4)}>
          <Ionicons name='ios-rainy' {...iconProps} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8,
    margin: 2,
  },
  buttonIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
})

export default App
