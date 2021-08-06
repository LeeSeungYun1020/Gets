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
        <AccordionPanel label={t("outer")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("coat")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("padding")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("cardigan")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("blazer")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("jumper")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("hood_zipup")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("fleece")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("top")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("tshirt")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("shirts_blouse")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("long_sleeve")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("sweatshirt")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("hoodie")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("knit")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("sleeveless")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("vest")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("bottom")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("jeans")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("slacks")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("cotton_pants")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("training_pants")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("jogger_pants")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("shorts")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("leggings")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("skirt")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("mini_skirt")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("middle_skirt")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("long_skirt")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("set")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("one_piece")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("two_piece")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("suit")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("jumpsuit")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("shoes")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("sneakers")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("roper")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("boots")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("derby")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("heels_pumps")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("sandals")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("slippers")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("bag")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("backpack")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("massenger_crossbag")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("dotbag")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("ecobag")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("leatherbag")}
            </Box>
        </AccordionPanel>
        <AccordionPanel label={t("hat")} style={{paddingLeft: 10}} onClick={props.onLocationClick}>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("cap")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("beanie")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("bucket_hat")}
            </Box>
            <Box pad="small" onClick={props.onSubLocationClick}>
                {t("beret")}
            </Box>
        </AccordionPanel>
    </Accordion>
    )
}

export default ProductCategory;