import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import store, { RootState } from '../../redux/store'
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions'
import { connect, useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { withTranslation, WithTranslation, useTranslation } from 'react-i18next'
import { Dispatch } from 'redux';
import { LanguageActionTypes } from '../../redux/language/languageActions'
// import {
//   addLanguageActionCreator,
//   changeLanguageActionCreator,
// } from "../../redux/language/languageActions";
// import { Dispatch } from 'redux';

// const mapStateToProps = (state:RootState) =>{
//   return {
//     language:state.languageReducer.language,
//     languageList:state.languageReducer.languageList
//   }
// }
// const mapDispatchToProps = (dispatch:Dispatch)=>{
//   return {
//     changeLanguage:(code:"zh" | "en") => {
//       const action = changeLanguageActionCreator(code);
//       dispatch(action);
//     },
//     addLanguage:(name:string,code:string) => {
//       const action = addLanguageActionCreator(name, code);
//       dispatch(action);
//     }
//   }
// }
// type PropsType =
//   WithTranslation & //i18n類型
//   ReturnType<typeof mapStateToProps> &//redux store 映射類型
//   ReturnType<typeof mapDispatchToProps>;//redux dispatch 映射類型

export const Header: React.FC = (/*{ t , language, languageList}*/) => {
    //React Router
    const history = useHistory() //獲取history資料
    const location = useLocation() //獲取location資料
    const params = useParams() //獲取params資料
    const match = useRouteMatch() //獲取match資料

    //React-redux
    //useSelector可以取代mapStateToProps
    const { languageList, language } = useSelector((state) => state.language)
    //useDispatch可以取代mapDispatchToProps
    const dispatch = useDispatch<Dispatch<LanguageActionTypes>>()
    const menuClickHandler = (e) => {
        if (e.key === 'new') {
            dispatch(addLanguageActionCreator('泰文', 'new_language'))
        } else {
            dispatch(changeLanguageActionCreator(e.key))
        }
    }

    //i18n
    const { t } = useTranslation()
    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>讓旅遊更幸福</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map((list) => (
                                    <Menu.Item key={list.code}>{list.name}</Menu.Item>
                                ))}
                                <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>
                    <Button.Group className={styles['button-group']}>
                        <Button onClick={() => history.push('register')}>註冊</Button>
                        <Button onClick={() => history.push('signIn')}>登入</Button>
                    </Button.Group>
                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => history.push('/')}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>
                        React旅遊網
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder={'請輸入旅遊目的地、主題、或關鍵字請輸入目的地'}
                    className={styles['search-input']}
                />
            </Layout.Header>
            <Menu mode={'horizontal'} className={styles['main-menu']}>
                <Menu.Item key={1}>旅遊首頁</Menu.Item>
                <Menu.Item key={2}>周末旅遊</Menu.Item>
                <Menu.Item key={3}>跟團遊</Menu.Item>
                <Menu.Item key="4"> 自由行 </Menu.Item>
                <Menu.Item key="5"> 輕旅行 </Menu.Item>
                <Menu.Item key="6"> 遊輪 </Menu.Item>
                <Menu.Item key="7"> 飯店加景點 </Menu.Item>
                <Menu.Item key="8"> 當地旅遊 </Menu.Item>
                <Menu.Item key="9"> 主題旅遊 </Menu.Item>
                <Menu.Item key="10"> 客製旅遊 </Menu.Item>
                <Menu.Item key="11"> 遊學 </Menu.Item>
                <Menu.Item key="12"> 簽證 </Menu.Item>
                <Menu.Item key="13"> 企業遊 </Menu.Item>
                <Menu.Item key="14"> 高玩 </Menu.Item>
                <Menu.Item key="15"> 戶外探險 </Menu.Item>
                <Menu.Item key="16"> 保險 </Menu.Item>
            </Menu>
        </div>
    )
}

//使用react-redux connect去映射store，在還沒有hook的時代要這樣寫
// export const Header = connect(mapStateToProps,mapDispatchToProps)(withTranslation()(HeaderComponent))
