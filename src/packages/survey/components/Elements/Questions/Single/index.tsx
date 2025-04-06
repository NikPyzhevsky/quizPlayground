import { FC, useCallback, useState } from 'react';
import {Button, ScrollView, StyleSheet, View, Text} from 'react-native';


import { IQuestionSingleSelect } from '../../../../models/services/survey';
import {Single} from '../../../../../shared/components/Elements';
import {IOption} from '../../../../../shared/models/components';
import {useApplicationContext} from '../../../../../shared/context/ApplicationContext.tsx';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        textAlign: 'center',
    },
    description: {
        marginTop: 7,
        textAlign: 'center',
        color: 'gray',
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 20 + 72,
    },
    icon: {
        marginTop: 15,
        alignSelf: 'center',
    },
    button: {
        paddingHorizontal: 20,
    },
    selectContainer: {
        flex: 1,
        marginTop: 28,
        marginHorizontal: 17,
        marginBottom: 56,
    },
});

type SingleSelectProps = {
    question: IQuestionSingleSelect;
};

const SingleSelect: FC<SingleSelectProps> = ({ question }) => {
    const {services: {wizard}}  = useApplicationContext();
    const [value, setValue] = useState<string>();
    console.log('rerender single');

    const labelSelector = useCallback((option: IOption) => option.label, []);
    const valueSelector = useCallback((option: IOption) => option.value, []);

    const handleNext = useCallback(() => {
        if (!value ) {
            return;
        }

        wizard.next(value);
    }, [value, wizard]);


    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.content}
                style={styles.root}
            >
                <Text style={styles.title} >
                    {question.title}
                </Text>
                <Text  style={styles.description}>
                    {question.description}
                </Text>
                <View style={styles.selectContainer}>
                    <Single<IOption>
                        options={question.options}
                        labelExtractor={labelSelector}
                        valueExtractor={valueSelector}
                        value={value}
                        onValueChange={setValue}
                    />
                </View>
            </ScrollView>
            <Button
                disabled={!value}
                onPress={handleNext}
                title={question.button}
            />
        </>
    );
};

export default SingleSelect;
