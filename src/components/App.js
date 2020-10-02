import React from 'react'

import { ThemeProvider, CSSReset, Box, Text } from '@chakra-ui/core'

// Custom components
import BarcodeForm from './BarcodeForm'
import Credits from './Credits'

const App = () => {
	return (
		<ThemeProvider>
			<CSSReset />
			<div className='app'>
				<Box bg="gray.900" minHeight="100vh" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
					<Text fontSize="5xl" color="cyan.50" mb={4}>BRCODIFY</Text>
					<Text fontSize="3xl" color="cyan.50" mb={6}>A simple barcode generator.</Text>


					<BarcodeForm></BarcodeForm>
					<Credits></Credits>
				</Box>

			</div>
		</ThemeProvider>
	)
}

export default App

