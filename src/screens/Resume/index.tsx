import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';

import {useTheme} from 'styled-components'

import {VictoryPie} from 'victory-native'

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories';

import * as S from './styles'



export interface TransactionData{
    name: string
    amount: string
    category: string
    date: string
    type: 'positive' | 'negative'
}

interface CategoryData{
    key: string
    name: string
    totalFormatted: string
    total: number
    color:string
    percentFormatted: string
    percent: number
}


export function Resume() {

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

    const theme = useTheme()

    async function loadData() {
        const dataKey = '@gofinances:transactions';  
        const response =  await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : []
       
        const expensives = responseFormatted
        .filter((expensive:TransactionData) => expensive.type === 'negative')


        const expensivesTotal = expensives.reduce((accumulator:number, expensive: TransactionData) =>{
            return accumulator + Number(expensive.amount)
        },0 )


        
        const totalByCategory:CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            })
        
        if(categorySum > 0) {
            const total = categorySum.toLocaleString('pt-BR',{style:'currency', currency:'brl'})

            const percent = (categorySum/expensivesTotal * 100)

            const percentFormatted = `${percent.toFixed(0)}%`

            totalByCategory.push({
                key: category.key,
                name: category.name,
                total:categorySum,
                totalFormatted: total,
                color:category.color,
                percent,
                percentFormatted
            })
        }
        })

        console.log(totalByCategory)
        setTotalByCategories(totalByCategory)
    }

    useEffect(() => {
       loadData()
    }, [])
    
    return (
        <S.Container>
            <S.Header><S.Title>Resumo por categoria</S.Title></S.Header>

            <S.Content>

              <S.ChartContainer>
                <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category=> category.color)}
                style={{
                    labels:{
                    fontSize:RFValue(18),
                    fontWeight:'bold',
                    fill:theme.colors.shape
                    }
                }}
                labelRadius={50}
                x="percentFormatted"
                y="total"
                />
              </S.ChartContainer>

              {
                totalByCategories.map(item => (
                <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color}/>
                ))  
              }
            </S.Content>


        </S.Container>
    )
}
