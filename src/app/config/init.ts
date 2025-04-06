import SurveyService from '../../packages/survey/services/survey';

export const initApplicationContext = () => {
    const wizardServiсe = new SurveyService();

    return {
        services: {
            wizard: wizardServiсe,
        },
    };
};

export type IApplicationContext = ReturnType<typeof initApplicationContext>;
