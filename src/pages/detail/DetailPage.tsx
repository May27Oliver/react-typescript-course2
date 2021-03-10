import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import style from './index.module.css';

interface MatchParams {
    touristRouteId:string
}

export const DetailPage:React.FC<RouteComponentProps<MatchParams>> = ({history,match,location}) => {
    return (//從props.match.params獲取路徑參數
        <h1>旅遊頁面詳情頁面,路徑ID:{match.params.touristRouteId}</h1>
    )
}