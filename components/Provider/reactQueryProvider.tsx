"use client";
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
interface Props {
    children: React.ReactNode;
}

const queryClient = new QueryClient()

const ReactQueryProvider = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);
export default ReactQueryProvider;