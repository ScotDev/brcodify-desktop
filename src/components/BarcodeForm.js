
import React, { useState, useEffect } from 'react';

// This barcode library is a react wrapper for the JSbarcode library
import Barcode from "react-hooks-barcode";

import { Text, Stack, Button, ButtonGroup, Box, Input, Select, Flex, PseudoBox } from '@chakra-ui/core'

export default function FormComponentHooks() {

    const [format, setformat] = useState("CODE128")
    const [barcodeValue, setbarcodeValue] = useState("EXAMPLE CODE 12345")
    const [inputValue, setinputValue] = useState("EXAMPLE CODE 12345")
    const [message, setMessage] = useState(null);

    const auto = '(Auto)';
    const CODE128 = 'CODE128';
    const CODE39 = 'CODE39';
    const CODE128A = 'CODE128A';
    const CODE128B = 'CODE128B';
    const CODE128C = 'CODE128C';
    const defaultValue = 'EXAMPLE CODE 12345';
    // ITF14 requires input validation for exactly 13 numbers only (14th is calculated checksum)
    const ITF14 = 'ITF14';
    // MSI requires a check on input for digits only between 0-9
    // const MSI = 'MSI'
    // const MSI = 'MSI10'
    // const MSI = 'MSI11'
    // const MSI = 'MSI1010'

    const config = {
        fontOptions: "bold",
        font: "monospace",
        width: 1
    };

    const downloadBarcode = () => {
        // const generatedSvg = window.getElementById('barcode');
        // const img = generatedSvg.toDataURL('image/png');
        // FileSaver.saveAs(img, barcodeValue, { type: "image/png" })
        alert("download")
    }

    const printBarcode = () => {
        // const canvas = document.getElementById('barcode');
        // const img = canvas.toDataURL('image/png');
        // const url = "about:blank";
        // const newWindow = window.open(url, "_new");
        // newWindow.document.open();
        // newWindow.document.write(`<img src='${img}' onload='window.print()' />`)
        alert(barcodeValue);
    }


    const handleSubmit = e => {
        const regexPattern = new RegExp("[^0-9]", "g");
        e.preventDefault(e);

        if (inputValue.length > 50) {
            setMessage("Value cannot be longer than 50 characters");
            setbarcodeValue(defaultValue)
        } else if (inputValue.startsWith(' ')) {
            setMessage("Value cannot start with a blank space");
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & inputValue.length !== 13) {
            setMessage("An ITF-14 code must be exactly 13 digits")
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & inputValue.length !== 13) {
            setMessage("'An ITF-14 code must be exactly 13 digits'")
            setbarcodeValue(defaultValue)
        } else if (format === ITF14 & regexPattern.test(inputValue)) {
            setMessage("An ITF-14 code must only contain digits")
            setbarcodeValue(defaultValue)
        } else {
            setbarcodeValue(inputValue)
            setMessage(null)
            document.title = `BRCODIFY | ${inputValue}`
        }

    }


    useEffect(
        () => {
            if (!inputValue) {
                setMessage("Please enter a value");
                setbarcodeValue(defaultValue)
                setinputValue(defaultValue)
            } else if (inputValue.length > 50) {
                console.log("Value too long")
                setMessage("Value cannot be longer than 50 characters");
                setbarcodeValue(defaultValue)
            } else if (inputValue.startsWith(' ')) {
                console.log("Value cannot start with blank space")
                setMessage("Value cannot start with a blank space");
                setbarcodeValue(defaultValue)
            } else {
                setMessage(null)
            }
        },
        [inputValue]
    );


    return (
        <Box p={4} display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="55%">

            <Flex as="form" w="100%" display="flex" alignItems="center" flexDirection="column" onSubmit={e =>
                handleSubmit(e)
            }>
                <PseudoBox w="80%" mb={10} p={4} display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" border="2px" borderRadius="md" borderColor="cyan.50">
                    <Stack spacing={4} w="100%">
                        <Input

                            focusBorderColor="pink.500"
                            bg="cyan.50"
                            variant="outline"
                            size="lg"
                            type="text"
                            name="input"
                            placeholder="Example code 12345"
                            autoFocus
                            autoComplete="off"
                            maxLength="51"
                            onChange={e =>
                                setinputValue(e.target.value.toString().toUpperCase())
                            }
                        />

                        <Select name="format" placeholder="Select barcode type" defaultValue={CODE128} variant="outline" focusBorderColor="pink.500" bg="cyan.50" size="lg" onChange={e => { setformat(e.target.value) }}>

                            <optgroup label='CODE128 Series'>
                                <option value={CODE128}>{CODE128} {auto}</option>
                                <option value={CODE128A}>{CODE128A}</option>
                                <option value={CODE128B}>{CODE128B}</option>
                                <option value={CODE128C}>{CODE128C}</option>
                            </optgroup>
                            <optgroup label='CODE39 Series'>
                                <option value={CODE39}>{CODE39}</option>
                            </optgroup>
                            <optgroup label='ITF-14 Series'>
                                <option value={ITF14}>{ITF14}</option>
                            </optgroup>
                        </Select>
                    </Stack>

                    {message && (<Text color="red.500" m={2} fontSize="lg">{message}</Text>)}

                    <Button mt={6} size="lg" bg="pink.500" color="cyan.50" rounded="md" onClick={(e) => { handleSubmit(e) }}>Generate</Button>
                </PseudoBox>
            </Flex>


            <PseudoBox border="1px" borderRadius="md" borderColor="gray.200" mb={10} overflow="hidden" p={2}>
                <Barcode value={barcodeValue} format={format} {...config} />
            </PseudoBox>

            <ButtonGroup spacing={4} mb={10}>
                <Button bg="pink.500" size="lg" color="cyan.50" onClick={() => { printBarcode() }}>Print</Button>
                <Button bg="pink.500" size="lg" color="cyan.50" onClick={() => { downloadBarcode() }}>Download</Button>
            </ButtonGroup>

            {/* <Text color="cyan.100">Path: {path.join(os.homedir(), "barcodes")}</Text> */}
        </Box>
    )
}