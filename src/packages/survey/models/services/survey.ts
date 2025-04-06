import {ReactNode} from 'react';

export type IAnswerType = string | string[];

export type IQuestionType =
    | 'singleSelect'
    | 'multiSelect';

export type IQuestionDetails = string;

type IQuestionMap = {
    singleSelect: IQuestionSingleSelect;
    multiSelect:  IQuestionMultiSelect;
};

export type IConfig = {
    [K in IQuestionType]?: (question: IQuestionMap[K]) => ReactNode;
};

export type IAnswerOption = { value: string; label: string };

export interface IQuestionDefault {
    id: string;
    title: string;
    description?: string;
    button: string;
    type: IQuestionType;
    details?: IQuestionDetails;
    options?: IAnswerOption[];
}

export interface IQuestionSingleSelect extends IQuestionDefault {
    options: IAnswerOption[];
    type: 'singleSelect';
}

export interface IQuestionMultiSelect extends IQuestionDefault {
    options: IAnswerOption[];
    type: 'multiSelect';
}

export type IQuestion = IQuestionDefault | IQuestionSingleSelect | IQuestionMultiSelect;

export interface IWizardAdapter {
    submit: (
        answers: Omit<Map<string, IAnswerType>, 'set' | 'clear' | 'delete'>,
        questions: IQuestion[]
    ) => void;
    init: () => { config: IConfig; questions: IQuestion[] };
    getQuestionDetails: (id: string, answers: IAnswerType[]) => IQuestionDetails;
}

export interface IStatistic {
    [id: string]: {
        [answer: string]: number;
    };
}

export type Listener = (answer: IAnswerType | undefined) => void;
export type IndexListener = (index: number) => void;


export type IndexSubscribe =  (questionId: 'index', listener: IndexListener) => () => void;
export type ISubscribe = (questionId: string, listener: Listener) => () => void;

export interface IWizardController {
    layoutConfig: IConfig;
    answers: Omit<Map<string, IAnswerType>, 'clear' | 'delete'>;
    questions: IQuestion[];
    currentQuestionIndex: number;
    currentQuestionId: string;
    currentQuestionAnswer: IAnswerType | undefined;
    getAnswerById: (id: string) => IAnswerType | undefined;
    next: (answer: IAnswerType) => void;
    prev: () => void;
    subscribe: IndexSubscribe | ISubscribe;
}
