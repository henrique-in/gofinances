import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import HighLightCard from '../../components/HighLightCard'
import TransactionCard from '../../components/TransactionCard'



import * as S from './styles'

export function Dashboard() {
    return (
        <S.Container>
         <S.Header>
            <S.UserWrapper>
             <S.UserInfo>
                 <S.Photo source={{uri:'https://avatars.githubusercontent.com/u/44737473?v=4'}}>

                 </S.Photo>

                 <S.User>
                     <S.UserGreeting>Olá</S.UserGreeting>
                     <S.UserName>Henrique</S.UserName>
                 </S.User>
             </S.UserInfo>
              <S.Icon name="power" />
             </S.UserWrapper>
             
         </S.Header>
         
         <S.HighLightCards>
            <HighLightCard 
            type="up"
            title="Entradas" 
            amount="R$ 17.400,00" 
            lastTransaction="Última entrada dia 13 de abril"
            
            />
            <HighLightCard 
            type="down"
            title="Saida" 
            amount="R$ 1.400,00" 
            lastTransaction="Última saida dia 03 de abril"
            
            />
            <HighLightCard 
            type="total"
            title="Total" 
            amount="R$ 17.400,00" 
            lastTransaction="01 a 13 de abril"
            
            />
         </S.HighLightCards>
         
         <S.Transactions>
             <S.Title>
                 Listagem
             </S.Title>
             <TransactionCard/>
         </S.Transactions>
        
        </S.Container>
    )
}
