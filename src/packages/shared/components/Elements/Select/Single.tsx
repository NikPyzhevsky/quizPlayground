import {StyleSheet, View} from 'react-native';

import Option from './Option';

const styles = StyleSheet.create({
  root: {
    rowGap: 12,
  },
});

interface SingleSelectProps<T> {
  options: T[];
  labelExtractor: (option: T) => string;
  valueExtractor: (option: T) => string;
  onValueChange: (value: string) => void;
  value?: string;
}

const Single = <T,>({
  options,
  onValueChange,
  value,
  labelExtractor,
  valueExtractor,
}: SingleSelectProps<T>) => {

  return (
    <View style={styles.root}>
      {options.map((option) => {
        const optionLabel = labelExtractor(option);
        const optionValue = valueExtractor(option);
        const selected = value === optionValue;

        return (
          <Option
            value={optionValue}
            label={optionLabel}
            selected={selected}
            onPress={onValueChange}
            key={optionValue}
          />
        );
      })}
    </View>
  );
};

Single.defaultProps = {
  value: undefined,
};

export default Single;
