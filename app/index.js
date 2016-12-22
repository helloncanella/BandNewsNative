import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {Columnists} from 'components/columnists.js' 

export class Index extends Component {
  render() {
    return (
      <ScrollableTabView style={styles.container}>
        <Columnists tabLabel="Colunistas" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


        // <Video source={{ uri: "http://www.bandnewsfm.com.br/audio/2016/12/SIMAO_2012.mp3" }}   // Can be a URL or a local file.
        //   ref={(ref) => {
        //     this.player = ref
        //   } }                             // Store reference
        //   rate={1.0}                     // 0 is paused, 1 is normal.
        //   volume={1.0}                   // 0 is muted, 1 is normal.
        //   muted={false}                  // Mutes the audio entirely.
        //   paused={false}                 // Pauses playback entirely.
        //   resizeMode="contain"             // Fill the whole screen at aspect ratio.
        //   repeat={true}                  // Repeat forever.
        //   playInBackground={true}       // Audio continues to play when app entering background.
        // // Callback when video cannot be loaded
        //   style={styles.backgroundVideo} />