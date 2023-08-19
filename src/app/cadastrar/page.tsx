'use client'

import { useState, useRef, useEffect } from "react";

export default function CadastrarProduto() {
    const [name, setName] = useState<string>('');
    const [isConverted, setIsConverted] = useState<boolean>(false);
    const input = useRef<HTMLInputElement>(null);

    function convertStringToNumbers(inputString:String) {
        const letterMapping:any = {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
            'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17,
            'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25,
            'z': 26, ' ': 27
        };

        // Remove accents from letters
        function removeAccents(str:any) {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }

        inputString = removeAccents(inputString.toLowerCase());

        let result = '';
        for (let i = 0; i < inputString.length; i++) {
            const char = inputString[i];
            if (letterMapping.hasOwnProperty(char)) {
            result += letterMapping[char];
            }
        }
        return result;
    }


    function handleFormSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (input.current && input.current.value) {
            const nameValue = input.current.value;
            const nameConverted = convertStringToNumbers(nameValue);
            setName(nameConverted);
            setIsConverted(true);
        }
    }

    useEffect(() => {
        if (isConverted) {
            // Aqui você pode executar qualquer ação desejada após a conversão e o estado ser atualizado.
            console.log("Nome convertido:", name);
        }
    }, [isConverted, name]);

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="input">Cadastrar produto</label>
                <input ref={input} name="input" type="text" />
                <button type="submit">Enviar</button>
            </form>

            {isConverted && <input type="copy" value={name} />}

        </>
    );
}
