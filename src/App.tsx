import React from 'react';
import Routes from "./Routes";
import DataContextProvider from "./context/DataContextProvider";

type Props = {}

const App: React.FC<Props> = (props: Props) => {
    return (
        <DataContextProvider>
            <Routes />
        </DataContextProvider>
    );
};

export default App;