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
                <Box pad="small">
                    {t("shirts_blouse")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/longsleeve">
                <Box pad="small">
                    {t("long_sleeve")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/sweatshirt">
                <Box pad="small">
                    {t("sweatshirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/hoodie">
                <Box pad="small">
                    {t("hoodie")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/knit">
                <Box pad="small">
                    {t("knit")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/sleeveless">
                <Box pad="small">
                    {t("sleeveless")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/top/vest">
                <Box pad="small">
                    {t("vest")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("bottom")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/jeans">
                <Box pad="small">
                    {t("jeans")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/slacks">
                <Box pad="small">
                    {t("slacks")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/cotton">
                <Box pad="small">
                    {t("cotton_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/training">
                <Box pad="small">
                    {t("training_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/jogger">
                <Box pad="small">
                    {t("jogger_pants")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/shorts">
                <Box pad="small">
                    {t("shorts")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bottom/leggings">
                <Box pad="small">
                    {t("leggings")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("skirt")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/mini">
                <Box pad="small">
                    {t("mini_skirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/middle">
                <Box pad="small">
                    {t("middle_skirt")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/skirt/long">
                <Box pad="small">
                    {t("long_skirt")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("set")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/set/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/onepiece">
                <Box pad="small">
                    {t("one_piece")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/twopiece">
                <Box pad="small">
                    {t("two_piece")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/suit">
                <Box pad="small">
                    {t("suit")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/set/jumpsuit">
                <Box pad="small">
                    {t("jumpsuit")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("shoes")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/sneakers">
                <Box pad="small">
                    {t("sneakers")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/roper">
                <Box pad="small">
                    {t("roper")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/boots">
                <Box pad="small">
                    {t("boots")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/derby">
                <Box pad="small">
                    {t("derby")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/heels">
                <Box pad="small">
                    {t("heels_pumps")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/sandals">
                <Box pad="small">
                    {t("sandals")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/shoes/slippers">
                <Box pad="small">
                    {t("slippers")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("bag")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/bag/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/backpack">
                <Box pad="small">
                    {t("backpack")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/massenger">
                <Box pad="small">
                    {t("massenger_crossbag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/dot">
                <Box pad="small">
                    {t("dotbag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/eco">
                <Box pad="small">
                    {t("ecobag")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/bag/leather">
                <Box pad="small">
                    {t("leatherbag")}
                </Box>
            </NavLink>
        </AccordionPanel>
        <AccordionPanel label={t("hat")} style={{paddingLeft: 10}}>
            <NavLink activeStyle={activeStyle} to = "/product/hat/all">
                <Box pad="small">
                    {t("look_all")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/cap">
                <Box pad="small">
                    {t("cap")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/beanie">
                <Box pad="small">
                    {t("beanie")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/bucket">
                <Box pad="small">
                    {t("bucket_hat")}
                </Box>
            </NavLink>
            <NavLink activeStyle={activeStyle} to = "/product/hat/beret">
                <Box pad="small">
                    {t("beret")}
                </Box>
            </NavLink>
        </AccordionPanel>
    </Accordion>
    )
}

export default ProductCategory;