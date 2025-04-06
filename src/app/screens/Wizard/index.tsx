import { IWizardAdapter } from '../../../packages/survey/models/services/survey.ts';
import {ActivityIndicator, View} from 'react-native';
import Wizard from '../../../packages/survey/components/Elements/Wizard';
import {useApplicationContext} from '../../../packages/shared/context/ApplicationContext.tsx';
import {useEffect, useState} from 'react';
import SingleSelect from '../../../packages/survey/components/Elements/Questions/Single';
import MultiSelect from '../../../packages/survey/components/Elements/Questions/Multi';

const adapter: IWizardAdapter = {
    init: () => ({
        config: {
            singleSelect: (question) => <SingleSelect question={question}/>,
            multiSelect: (question) => <MultiSelect question={question}/>,
        },
        questions: [
            {
                id: 'q1',
                title: 'What is your favorite color?',
                type: 'singleSelect',
                button: 'Next',
                options: [
                    { value: 'red', label: 'Red' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'green', label: 'Green' },
                ],
            },
            {
                id: 'q2',
                title: 'Choose your hobbies',
                type: 'multiSelect',
                button: 'Submit',
                options: [
                    { value: 'sports', label: 'Sports' },
                    { value: 'music', label: 'Music' },
                    { value: 'coding', label: 'Coding' },
                ],
            },
        ],
    }),

    submit: (answers, questions) => {
        console.log('Submitted Answers:', Array.from(answers.entries()));
        console.log('Questions:', questions);
    },
    getQuestionDetails:(id, answers)=>{
        return`Details for question ${id} with answers ${answers.join(', ')}`;
    },
};


const WizardScreen = () => {
    const {services: {wizard}} = useApplicationContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        wizard.init(adapter);
        setIsLoading(false);
    },[wizard]);

    if( isLoading){
        // eslint-disable-next-line react-native/no-inline-styles
        return <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size={'large'}/></View>;
    }


    return(
        <View style={{width:'100%', height:'100%', paddingTop:100, paddingBottom: 100, backgroundColor:'yellow'}}>
        <Wizard controller={wizard} questions={wizard.questions} />
        </View>
    );
};

export default WizardScreen;
