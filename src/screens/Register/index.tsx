import React,{useState, useEffect} from 'react'
import { 
    Keyboard,
    Modal, 
    Alert,
    TouchableWithoutFeedback } from 'react-native'

import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form'
import  * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native"

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import InputForm from '../../components/Form/InputForm'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import {CategorySelect} from '../CategorySelect'
import * as S from './styles'

interface FormData{
    name:string;
    amount: string;

}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),

    amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

export  function Register() {
    const dataKey = '@gofinances:transactions';  
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const navigation = useNavigation()

    const [category, setCategory]= useState({
        key:'category',
        name:'Categoria',
    })

    const {
        control,
        reset,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:yupResolver(schema)
    })

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false)
    }

    async function handleRegister(form: FormData){
        if(!transactionType)
        return Alert.alert("Selecione o tipo da transação")
        if(category.key === 'category')
        return Alert.alert("Selecione a categoria")
        
        const newTransaction={
            id:String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category:category.key,
            date: new Date()
        }
        // console.log(newTransaction)

        try {
          const data =  await AsyncStorage.getItem(dataKey);
          const currentData = data ? JSON.parse(data) : []
        
          const dataFormatted = [
              ...currentData,
              newTransaction
          ]

          await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

          reset()
          setTransactionType('');
          setCategory({
              key:'category',
              name:'Categoria'
          })
          navigation.navigate('Listagem')
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar')
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
            <S.Header>
                <S.Title>Cadastro</S.Title>
            </S.Header>

        <S.Form>
            <S.Fields>
                <InputForm
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                error={errors.name && errors.name.message}
                />

                <InputForm
                name="amount"
                control={control}
                placeholder="Preço"
                keyboardType="numeric"
                error={errors.amount && errors.amount.message}
                />
               
                
                <S.TransactionType>
                    <TransactionTypeButton 
                    title="Income" 
                    type="up" 
                    onPress={()=>handleTransactionTypeSelect('positive')}
                    isActive={transactionType === 'positive'}
                    />

                    <TransactionTypeButton 
                    title="Outcome" 
                    type="down"
                    onPress={()=>handleTransactionTypeSelect('negative')}
                    isActive={transactionType === 'negative'}
                    />
                </S.TransactionType>

                <CategorySelectButton 
                title={category.name}
                onPress={handleOpenSelectCategoryModal}
                />
            </S.Fields>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
        </S.Form>
        <Modal visible={categoryModalOpen}>
         <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategoryModal} />
        </Modal>
        
        </S.Container>
        </TouchableWithoutFeedback>
    )
}
