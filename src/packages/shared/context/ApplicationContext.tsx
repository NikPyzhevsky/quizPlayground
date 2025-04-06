import { type PropsWithChildren, createContext, useContext, useMemo } from 'react';

import { type IApplicationContext as IInitApplicationContext } from '../../../app/config/init';

interface IApplicationContext {
    services: IInitApplicationContext['services'];
}

export const ApplicationContext = createContext<IApplicationContext>({
    services: {},
} as never as IApplicationContext);

interface ApplicationContextProviderProps extends PropsWithChildren {
    services: IApplicationContext['services'];
}

const ApplicationContextProvider = ({
                                        children,
                                        services,
                                    }: ApplicationContextProviderProps) => {
    const value = useMemo(() => ({services }), [services]);

    return <ApplicationContext.Provider value={value}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext(ApplicationContext);

export default ApplicationContextProvider;
