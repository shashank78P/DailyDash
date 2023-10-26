"use client";
import { Provider } from 'react-redux'
import Store from '../store/root';
interface Props {
    children: React.ReactNode;
}

const ReduxProvider = ({ children }: Props) => (
    <Provider store={Store}>
        {children}
    </Provider>
);
export default ReduxProvider;