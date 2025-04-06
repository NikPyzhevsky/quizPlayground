import { useCallback } from 'react';
import {StyleSheet, View} from 'react-native';

import Option from './Option';

const styles = StyleSheet.create({
  root: {
    rowGap: 12,
  },
});

interface MultiSelectProps<T> {
  options: T[];
  labelExtractor: (option: T) => string;
  valueExtractor: (option: T) => string;
  values: string[];
  onValuesChange: (values: string[]) => unknown;
}

const Multi = <T,>({
  options,
  onValuesChange,
  values,
  labelExtractor,
  valueExtractor,
}: MultiSelectProps<T>) => {

  const handleOption = useCallback(
    (value: string) => {
      let updatedValue;

      if (values.includes(value)) {
        updatedValue = values.filter((currentValue) => currentValue !== value);
      } else {
        updatedValue = [...values, value];
      }

      onValuesChange(updatedValue);
    },
    [onValuesChange, values]
  );

  return (
    <View style={styles.root}>
      {options.map((option) => {
        const optionLabel = labelExtractor(option);
        const optionValue = valueExtractor(option);
        const selected = values.includes(optionValue);

        return (
          <Option
            value={optionValue}
            label={optionLabel}
            selected={selected}
            onPress={handleOption}
            key={optionValue}
          />
        );
      })}
    </View>
  );
};

export default Multi;
