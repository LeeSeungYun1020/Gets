import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: 28,
        width: 266,
        height: 44,
        marginTop: 10,
        marginBottom: 10,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const OutlineSelectShapeBox = (props) => {
    const {t, i18n} = useTranslation()
    const classes = useStyles();
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label"/>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={props.event}
                >
                    <MenuItem value="">
                        <em>{props.info}</em>
                    </MenuItem>
                    <MenuItem value={"1"}>{t("body_slim")}</MenuItem>
                    <MenuItem value={"2"}>{t("body_regular")}</MenuItem>
                    <MenuItem value={"4"}>{t("body_large")}</MenuItem>

                </Select>
            </FormControl>
        </div>
    )
}

export default OutlineSelectShapeBox;