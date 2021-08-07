import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import {useTranslation} from "react-i18next";

const ProductCategory = (props) => {
    const {t,i18n} = useTranslation()
    return (
    <Accordion style={{
        width: 200,
        marginLeft: 150,
        marginRight: 30,
        marginTop: 150,
    }}>
        <div className = "category_title"><h2>{t("category")}</h2></div>
        <AccordionPanel label={t("outer")} style={{paddingLeft: 10}} >
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("coat")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("padding")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("cardigan")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("blazer")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("jumper")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("hood_zipup")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickOuter}>
                {t("fleece")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("top")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("tshirt")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("shirts_blouse")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("long_sleeve")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("sweatshirt")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("hoodie")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("knit")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("sleeveless")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickTop}>
                {t("vest")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("bottom")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("jeans")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("slacks")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("cotton_pants")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("training_pants")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("jogger_pants")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("shorts")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBottom}>
                {t("leggings")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("skirt")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickSkirt}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSkirt}>
                {t("mini_skirt")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSkirt}>
                {t("middle_skirt")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSkirt}>
                {t("long_skirt")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("set")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickSet}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSet}>
                {t("one_piece")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSet}>
                {t("two_piece")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSet}>
                {t("suit")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickSet}>
                {t("jumpsuit")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("shoes")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("sneakers")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("roper")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("boots")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("derby")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("heels_pumps")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("sandals")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickShoes}>
                {t("slippers")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("bag")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("backpack")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("massenger_crossbag")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("dotbag")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("ecobag")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickBag}>
                {t("leatherbag")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("hat")} style={{paddingLeft: 10}}>
            <Box pad="small" onClick={props.onDetailLocationClickHat}>
                {t("look_all")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickHat}>
                {t("cap")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickHat}>
                {t("beanie")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickHat}>
                {t("bucket_hat")}
            </Box>
            <Box pad="small" onClick={props.onDetailLocationClickHat}>
                {t("beret")}
            </Box>
        </AccordionPanel>
    </Accordion>
    )
}

export default ProductCategory;