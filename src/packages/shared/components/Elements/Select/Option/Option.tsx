import { type FC, useCallback } from 'react';
import {Pressable, StyleSheet, View,  Text} from 'react-native';


const styles = StyleSheet.create({
  root: {
    height: 52,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 1000,
  },
  selectedOption: {
    borderColor: 'blue',
    backgroundColor: 'white',
  },
  selectedText: {
    color: 'blue',
  },
});

interface OptionProps {
  value: string;
  label: string;
  selected: boolean;
  onPress: (value: string) => void;
}

const Option: FC<OptionProps> = ({ value, label, selected, onPress }) => {

  const handleOption = useCallback(() => {
    onPress(value);
  }, [onPress, value]);

  return (
    <Pressable
      onPress={handleOption}
      key={selected.toString()}
    >
      <View style={[styles.root, selected && styles.selectedOption]}>
        <Text
          style={selected && styles.selectedText}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default Option;
