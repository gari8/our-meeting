import '../../styles/globals.css'
import {AppProps} from "next/app";
import "../../styles/tailwind.css";
import {useApollo} from "../lib/applicationClient";
import {ApolloProvider} from "@apollo/client";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const client = useApollo(pageProps)
    return (
        <ApolloProvider client={client} >
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
