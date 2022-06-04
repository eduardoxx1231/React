import React, { useCallback, useEffect, useState } from 'react';
import { Container, Form, FormControl, Button, Collapse, InputGroup } from 'react-bootstrap';
import VocabularyList from '../common/layout/vocabularyList/VocabularyList';
import useVocabulary from '../hoocks/useVocabulary';
import { PlusLg, XLg} from 'react-bootstrap-icons';
import useDebounce from '../hoocks/useDebounce';
import { IWord } from '../models/IWord';
import { IDictionaryWord } from '../models/IDictionaryWord';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import DictionaryServoce from '../services/DictionaryServoce';
import DictionaryList from '../common/layout/dictionaryList/DictionaryList';

export default function VocabularySection() {
    const {vocabulary, addWord, setWordActive} = useVocabulary();
    const [isAddMode, setIsAddMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [translation, setTranslation] = useState('');
    const [isChoosen, setIsChoosen] = useState(false);
    const [filtredVocabularyList, setFiltredVocabularyList] = useState<IWord[]>(vocabulary);
    const [filtredDictionaryList, setFiltredDictionaryList] = useState<IDictionaryWord[]>([]);
    
    const filterBySearch = useCallback((str: string) => {
        const filtered = !str ? vocabulary 
            : vocabulary.filter((item) => item.word.includes(str));
        setFiltredVocabularyList(filtered);
    }, [vocabulary]);

    const handleChangeSearch = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const searchInput = target.value;
        const pattern = /^([^0-9]*)$/g;
        if (!searchInput.match(pattern)) return; 
        setSearch(searchInput);
    }

    const handleChangeTranslation = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const searchInput = target.value;
        setTranslation(searchInput);
    }

    const handleDictionaryChoice = (id: number) => {
        const choosed = filtredDictionaryList.find((item) => item.id === id)
        setTranslation(choosed.translations[0]);
        setIsChoosen(true);
    }

    const handleAddToggle = useCallback(() => {
        setIsAddMode(!isAddMode)
    }, [isAddMode]);

    const handleAddButton = useCallback(() => {
        setIsChoosen(true);
        console.log('add');
    }, [isAddMode]);
    
    const dictionarySearch = async(str:string) => {
        console.log('dictionarySearch', str);
        const response = await DictionaryServoce.search(str);
        // TODO Add error when no data;
        setFiltredDictionaryList(response.data);
    }
    const debouncedDictionarySearch = useDebounce(dictionarySearch, 400);
    
    useEffect(() => {
        filterBySearch(search);
    }, [vocabulary, search]);

    useAsyncEffect(async () => {
        if (!search || !isAddMode) return;
        debouncedDictionarySearch(search);
    }, [search, isAddMode]);

    useAsyncEffect(async () => {
        if (!search || !isAddMode || !isChoosen) return;
        console.log('add2');
        setIsLoading(true);
        await addWord(search, translation);
        setIsLoading(false);
        setIsChoosen(false);
        setTranslation('');
        setSearch('');
        setIsAddMode(false);
        setFiltredDictionaryList([])
    }, [search, isAddMode, isChoosen]);

    const onChangeActive = (id: IWord['id'], active: boolean) => {
        setWordActive(id, active);
    }
    
    return (
        <Container className='container-sm p-2'>
            <Form className=" mb-3">
                <InputGroup className="mb-3">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleChangeSearch}
                        value={search}
                    />
                    <Button
                        variant="outline-light" 
                        disabled={isLoading}
                        onClick={handleAddToggle}
                    >
                        {isAddMode ? <XLg color="royalblue" size={32}/> 
                            : <PlusLg color="royalblue" size={32}/>}
                    </Button>
                </InputGroup>
                <Collapse in={isAddMode}>
                    <div>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Your translation"
                                aria-label="Your translation"
                                aria-describedby="basic-addon2"
                                value={translation}
                                onChange={handleChangeTranslation}
                            />
                            <Button
                                variant="primary" 
                                className='px-4' 
                                disabled={isLoading || !translation || !search}
                                onClick={handleAddButton}
                            >
                                Add
                            </Button>
                        </InputGroup>
                    </div>
                </Collapse>
            </Form>
    
            {isAddMode ? <DictionaryList 
                            dicList={filtredDictionaryList} 
                            onClick={handleDictionaryChoice}
                        /> 
                : <VocabularyList 
                    wordsList={filtredVocabularyList}
                    onChangeActive={onChangeActive}
                    />
            }
        </Container>
    );
}