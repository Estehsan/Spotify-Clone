import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import styles from './styles';
import { Song } from "../../types";
import { Sound } from 'expo-av/build/Audio';

const song = {
  id: '1',
  uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

  imageUri: 'https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
  title: 'High on You',
  artist: 'Helen',
}

const PlayerWidget = () => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlayingStatus, setIsPlayingStatus] = useState<boolean>(true);


  const onPlayStatusUpdate = (status) => {
    setIsPlayingStatus(status.isPlayingStatus);
  };


  const playCurrentSong = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: isPlayingStatus },
      onPlayStatusUpdate
    )
    setSound(newSound)
  }
    ;
  useEffect(() => {
    playCurrentSong();
  }, [])

  const onPlayPause = async () => {
    if (!sound) { return }

    if (isPlayingStatus) {
      await sound.stopAsync();
    }
    else {
      await sound.playAsync();
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.imageUri }} style={styles.image} />
      <View style={styles.rightContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>

        <View style={styles.iconsContainer}>
          <AntDesign name="hearto" size={30} color={"white"} />

          <TouchableOpacity onPress={onPlayPause}>
            <FontAwesome name={isPlayingStatus ? 'pause' : 'play'} size={30} color={"white"} /></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PlayerWidget;
