import {
    IWizardAdapter,
    IWizardController,
    IAnswerType,
    IQuestion,
    IConfig,
    Listener, IndexListener,
} from '../models/services/survey.ts';

class SurveyService implements IWizardController {
    public adapter!: IWizardAdapter;
    public questions: IQuestion[] = [];
    public layoutConfig!: IConfig;
    public currentQuestionIndex = 0;
    public answers = new Map<string, IAnswerType>();
    public listeners = new Map<string, Set<Listener | IndexListener>>();

    init(adapter: IWizardAdapter) {
        this.adapter = adapter;
        const { questions, config } = adapter.init();
        this.questions = questions;
        this.layoutConfig = config;
        this.currentQuestionIndex = 0;
        // this.answers.clear();
        // this.listeners.clear();
    }

    get currentQuestionId() {
        return this.questions[this.currentQuestionIndex]?.id;
    }

    get currentQuestionAnswer() {
        return this.answers.get(this.currentQuestionId);
    }

    getAnswerById(questionId: string) {
        return this.answers.get(questionId);
    }

    subscribe(questionId:'index' | string, listener: Listener| IndexListener) {
        if(questionId === 'index'){

        }


        if (!this.listeners.has(questionId)) {
            this.listeners.set(questionId, new Set());
        }
        this.listeners.get(questionId)!.add(listener);

        return () => this.listeners.get(questionId)!.delete(listener);
    }

    private notify(questionId: string) {
        console.log('notify ',questionId);
        const listeners = this.listeners.get(questionId);
        let answer = this.answers.get(questionId);

        if(questionId == 'index'){
            console.log('listeners');
            console.log(listeners);
            answer = this.currentQuestionIndex as never as IAnswerType;
        }

        listeners?.forEach(listener => listener(answer as never));
    }

    prev() {
        this.currentQuestionIndex -= 1;
        this.notify('index');
    }

    next(answer: IAnswerType) {
        console.log(answer);
        const question = this.questions[this.currentQuestionIndex];

        this.answers.set(question.id, answer);
        this.notify(question.id);

        if (this.currentQuestionIndex === this.questions.length - 1) {
            this.adapter.submit(this.answers, this.questions);
            return;
        }

        this.currentQuestionIndex += 1;
        this.notify('index');

    }

    get state() {
        return {
            currentQuestionAnswer: this.currentQuestionAnswer,
            questions: this.questions,
            layoutConfig: this.layoutConfig,
            answers: this.answers,
            currentQuestionId: this.currentQuestionId,
            currentQuestionIndex: this.currentQuestionIndex,
        };
    }
}

export default SurveyService;
