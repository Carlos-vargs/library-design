import 'animate.css'
import Head from 'next/head'
import '../styles/globals.css'
import theme from '@components/theme'
import { ChakraProvider } from "@chakra-ui/react"


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme} >
			<Head>
				<title>Library</title>
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp