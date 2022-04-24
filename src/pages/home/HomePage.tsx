import React from 'react'
import { Header, Footer, Carousel, SideMenu, ProductCollection, BusinessPartners } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import styles from './HomePage.module.css'
import { useTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
    getProductListActionCreator,
    RecommendProductListActionTypes,
} from '../../redux/recommendProducts/recommendProductsActions';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';

export const HomePage: React.FC<WithTranslation> = () => {
    const { t } = useTranslation()
    const { productList, loading, error } = useSelector((state) => state.recommendProducts)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getProductListActionCreator());
    }, [])
    if (error) {
        return <div>網路出問題，請洽工程人員</div>
    }

    return loading ? (
        <Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
            }}
        />
    ) : (
        <>
            <Header />
            {/* 頁面內容 content */}
            <div className={styles['page-content']}>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                {productList && productList.length > 0 && (
                    <>
                        <ProductCollection
                            title={
                                <Typography.Title level={3} type="warning">
                                    {t('home_page.hot_recommended')}
                                </Typography.Title>
                            }
                            sideImage={sideImage}
                            products={productList[0].touristRoutes}
                        />
                        <ProductCollection
                            title={
                                <Typography.Title level={3} type="danger">
                                    {t('home_page.new_arrival')}
                                </Typography.Title>
                            }
                            sideImage={sideImage2}
                            products={productList[1].touristRoutes}
                        />
                        <ProductCollection
                            title={
                                <Typography.Title level={3} type="success">
                                    {t('home_page.domestic_travel')}
                                </Typography.Title>
                            }
                            sideImage={sideImage3}
                            products={productList[2].touristRoutes}
                        />
                    </>
                )}
                <BusinessPartners />
            </div>
            <Footer />
        </>
    )
}
