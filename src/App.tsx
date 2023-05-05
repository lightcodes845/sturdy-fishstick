import React from 'react';
import AppRoutes from "./AppRoutes";
import DataContextProvider from "./context/DataContextProvider";

type Props = {}

const App: React.FC<Props> = (props: Props) => {

    return (
        <DataContextProvider>
            <AppRoutes />
        </DataContextProvider>
    );
};

export default App;