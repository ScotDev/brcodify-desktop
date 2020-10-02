import React from 'react'

import { Box, Text, Link } from '@chakra-ui/core'

export default function Credits() {
    return (
        <Box textAlign="center" p={4}>
            <Text fontSize="md" color="cyan.50" >
                <Link href="https://github.com/ScotDev" isExternal>
                    Created by ScotDev </Link>
                 - powered by the <Link href="https://github.com/phaniteja1/react-hooks-barcode" isExternal
                >react-hooks-barcode library</Link>
            </Text>
        </Box>
    )
}