import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import * as S from './styles'

const icons = {
    up: 'arrow-up-circle',
    down:'arrow-down-circle'
}

interface Props extends RectButtonProps{
    title:string;
    type:'up' | 'down'
    isActive: boolean

}

export function TransactionTypeButton({ isActive ,title, type,...rest}: Props) {
    return (
        <S.Container 
        type={type}
        isActive={isActive}
        
        >
          <S.Button {...rest}>
                <S.Icon
                name={icons[type]}
                type={type}
                />
                <S.Title>{title}</S.Title>
            </S.Button>
        </S.Container>
    )
}
