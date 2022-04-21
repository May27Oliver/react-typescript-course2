import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import store, { RootState } from "../../redux/store";
import { LanguageState } from "../../redux/language/languageReducer";
import {  withTranslation, WithTranslation  } from "react-i18next";
import {
  addLanguageActionCreator,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { connect } from 'react-redux';//HOC高階函式
import { Dispatch } from 'redux';

const mapStateToProps = (state:RootState) => {//將state作為props進行傳遞
  return {
    language:state.language,
    languageList:state.languageList
  }
}

const mapDispatchToProps = ( dispatch:Dispatch ) => {
    return {
      changeLanguage:(code:"zh" | "en") => {
        const action = changeLanguageActionCreator(code);
        dispatch(action);
      },
      addLanguage:(name:string,code:string) => {
        const action = addLanguageActionCreator(name, code);
        dispatch(action);
      }
    }
}
type PropsType = RouteComponentProps & // react-router 路由類型 
  WithTranslation & //i18n類型
  ReturnType<typeof mapStateToProps> &//redux store 映射類型
  ReturnType<typeof mapDispatchToProps>;//redux dispatch 映射類型
//class無法使用hook，必須以hoc的方式加載路由
class HeaderComponent extends React.Component<PropsType>{
  handleStoreChange = () => {
    this.setState({
      language: this.props.language
    });
  }

  menuClickHandler=e=>{
    if(e.key === "new"){
      //處理新語言增加
      store.dispatch({
        type:"add_language",
        payload:{code:"new_language",name:"泰文"}
      });
    }else{
      this.setState({language:e.key});
      store.dispatch({
        type:"change_language",
        payload:e.key
      })
    }
  }

  render(){
    const { history , t , language, languageList} = this.props;
    return (
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {languageList.map(list=><Menu.Item key={list.code}>{list.name}</Menu.Item>)}
                  <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
                </Menu>
              }
              icon={<GlobalOutlined />}
            >

              
              {language ==='zh'? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles["button-group"]}>
              <Button onClick={()=>history.push('register')}>{t("header.register")}</Button>
              <Button onClick={()=>history.push('signIn')}>{t("header.signin")}</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles["main-header"]}>
          <span onClick={()=>history.push("/")}>
            <img src={logo} alt="logo" className={styles["App-logo"]} />
            <Typography.Title level={3} className={styles.title}>
              {t("header.title")}
            </Typography.Title>
          </span>
          <Input.Search
            placeholder={"請輸入目的地、主題"}
            className={styles["search-input"]}
          />
        </Layout.Header>
        <Menu mode={"horizontal"} className={styles["main-menu"]}>
          <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
          <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
          <Menu.Item key={3}>{t("header.group")}</Menu.Item>
          <Menu.Item key="4">{t("header.backpack")}</Menu.Item>
          <Menu.Item key="5">{t("header.private")}</Menu.Item>
          <Menu.Item key="6">{t("header.cruise")}</Menu.Item>
          <Menu.Item key="7">{t("header.hotel")}</Menu.Item>
          <Menu.Item key="8">{t("header.local")}</Menu.Item>
          <Menu.Item key="9">{t("header.theme")}</Menu.Item>
          <Menu.Item key="10">{t("header.custom")}</Menu.Item>
          <Menu.Item key="11">{t("header.study")}</Menu.Item>
          <Menu.Item key="12">{t("header.visa")}</Menu.Item>
          <Menu.Item key="13">{t("header.enterprise")}</Menu.Item>
          <Menu.Item key="14">{t("header.high_end")}</Menu.Item>
          <Menu.Item key="15">{t("header.outdoor")}</Menu.Item>
          <Menu.Item key="16">{t("header.insurance")}</Menu.Item>
        </Menu>
      </div>
    );
  } 
};

export const Header = connect(mapStateToProps)(
  withTranslation()(withRouter(HeaderComponent))
);