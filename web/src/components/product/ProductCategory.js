import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import {useTranslation} from "react-i18next";
import { NavLink } from 'react-router-dom'

const ProductCategory = (props) => {
    const activeStyle = {
        background: 'rgba(0, 0, 0, 0.05)'
    }
    const {t,i18n} = useTranslation()
    return (
    <Accordion style={{
        width: 200,
        marginRight: 120,
        marginTop: 150,
        marginBottom: 90
    }}>
        <div className = "category_title"><h2>{t("category")}</h2></div>
        <AccordionPanel label={t("outer")} style={{paddingLeft: 10}} >
            <NavLink activeStyle={activeStyle} to = "/product/outer/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/coat">
                <Box pad="small">
                    {t("coat")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/padding">
                <Box pad="small">
                    {t("padding")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/cardigan">
                <Box pad="small">
                    {t("cardigan")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/blazer">
            <Box pad="small">
                {t("blazer")}
            </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/jumper">
                <Box pad="small">
                    {t("jumper")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/jacket">
                <Box pad="small">
                    {t("jacket")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/hoodzipup">
                <Box pad="small">
                    {t("hood_zipup")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/outer/fleece">
                <Box pad="small">
                    {t("fleece")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("top")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/top/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/tshirt">
                <Box pad="small">
                    {t("tshirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/shirts">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickTop}>
                    {t("shirts_blouse")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/longsleeve">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickTop}>
                    {t("long_sleeve")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/sweatshirt">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickTop}>
                    {t("sweatshirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/hoodie">
                <Box pad="small" value = {16} onClick={props.onDetailLocationClickTop}>
                    {t("hoodie")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/knit">
                <Box pad="small" value = {32} onClick={props.onDetailLocationClickTop}>
                    {t("knit")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/sleeveless">
                <Box pad="small" value = {64} onClick={props.onDetailLocationClickTop}>
                    {t("sleeveless")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/vest">
                <Box pad="small" value = {128} onClick={props.onDetailLocationClickTop}>
                    {t("vest")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("bottom")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickBottom}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/jeans">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickBottom}>
                    {t("jeans")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/slacks">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickBottom}>
                    {t("slacks")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/cotton">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickBottom}>
                    {t("cotton_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/training">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickBottom}>
                    {t("training_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/jogger">
                <Box pad="small" value = {16} onClick={props.onDetailLocationClickBottom}>
                    {t("jogger_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/shorts">
                <Box pad="small" value = {32} onClick={props.onDetailLocationClickBottom}>
                    {t("shorts")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/leggings">
                <Box pad="small" value = {64} onClick={props.onDetailLocationClickBottom}>
                    {t("leggings")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("skirt")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickSkirt}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/mini">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickSkirt}>
                    {t("mini_skirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/middle">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickSkirt}>
                    {t("middle_skirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/long">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickSkirt}>
                    {t("long_skirt")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("set")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/set/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickSet}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/onepiece">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickSet}>
                    {t("one_piece")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/twopiece">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickSet}>
                    {t("two_piece")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/suit">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickSet}>
                    {t("suit")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/jumpsuit">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickSet}>
                    {t("jumpsuit")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("shoes")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickShoes}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/sneakers">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickShoes}>
                    {t("sneakers")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/roper">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickShoes}>
                    {t("roper")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/boots">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickShoes}>
                    {t("boots")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/derby">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickShoes}>
                    {t("derby")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/heels">
                <Box pad="small" value = {16} onClick={props.onDetailLocationClickShoes}>
                    {t("heels_pumps")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/sandals">
                <Box pad="small" value = {32} onClick={props.onDetailLocationClickShoes}>
                    {t("sandals")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/slippers">
                <Box pad="small" value = {64} onClick={props.onDetailLocationClickShoes}>
                    {t("slippers")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("bag")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/bag/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickBag}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/backpack">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickBag}>
                    {t("backpack")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/massenger">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickBag}>
                    {t("massenger_crossbag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/dot">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickBag}>
                    {t("dotbag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/eco">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickBag}>
                    {t("ecobag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/leather">
                <Box pad="small" value = {16} onClick={props.onDetailLocationClickBag}>
                    {t("leatherbag")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("hat")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/hat/all">
                <Box pad="small" value = {-1} onClick={props.onDetailLocationClickHat}>
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/cap">
                <Box pad="small" value = {1} onClick={props.onDetailLocationClickHat}>
                    {t("cap")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/beanie">
                <Box pad="small" value = {2} onClick={props.onDetailLocationClickHat}>
                    {t("beanie")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/bucket">
                <Box pad="small" value = {4} onClick={props.onDetailLocationClickHat}>
                    {t("bucket_hat")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/beret">
                <Box pad="small" value = {8} onClick={props.onDetailLocationClickHat}>
                    {t("beret")}
                </Box>
            </NavLink>
        </AccordionPanel>
    </Accordion>
    )
}

export default ProductCategory;