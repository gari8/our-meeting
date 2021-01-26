import '../../styles/globals.css'
import {AppProps} from "next/app";
import "../../styles/tailwind.css";
import {useApollo} from "../lib/applicationClient";
import {ApolloProvider} from "@apollo/client";
import {AuthProvider} from "../lib/auth";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const client = useApollo(pageProps)
    return (
        <ApolloProvider client={client} >
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ApolloProvider>
    )
}

export default MyApp
