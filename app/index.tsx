import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const translate = async (text: string) => {
    const { data, error } = await supabase.functions.invoke('translate');
    console.log(error);
    console.log(data);

    return 'translation';
  };

  const onTranslate = async () => {
    const translation = await translate(input);
    setOutput(translation);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      {/* Language selector row */}
      <View className="flex-row justify-around p-5">
        <Text className="font-semibold color-blue-600">English</Text>
        <Octicons name="arrow-switch" size={16} color="gray" />
        <Text className="font-semibold color-blue-600">Spanish</Text>
      </View>

      {/* input container */}
      <View className="border-y border-gray-300 p-5">
        <View className="flex-row gap-5">
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Enter text here"
            className="min-h-32 flex-1 text-xl"
            multiline
            maxLength={5000}
          />
          <FontAwesome6
            onPress={onTranslate}
            name="circle-arrow-right"
            size={24}
            color="royalblue"
          />
        </View>
        <View className="flex-row justify-between">
          <FontAwesome6 name="microphone" size={18} color="dimgray" />
          <Text className="color-gray-500">{input.length} / 5000</Text>
        </View>
      </View>

      {/* output container */}
      {output && (
        <View className="gap-5 bg-gray-200 p-5">
          <Text className="min-h-32 text-xl">{output}</Text>
          <View className="flex-row justify-between">
            <FontAwesome6 name="volume-high" size={18} color="dimgray" />
            <FontAwesome6 name="copy" size={18} color="dimgray" />
          </View>
        </View>
      )}
    </>
  );
}
