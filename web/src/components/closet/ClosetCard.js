import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import { Menu, MenuItem} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    root: {
        width: 310,
        borderRadius: 10,
    },
    media: {
        height: 370,
    },
});

const ClosetCard = ({item}) => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const {id, price} = item
    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleDeleteClick = () => {
        axios.get(`http://localhost:3000/product/unfavorite/${id}`, {withCredentials: true})
            .then(response => {
                console.log(response.data)
                setAnchorEl(null);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="closet_card">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`http://localhost:3000/coordination/image/${id}`}
                        >
                        <IconButton aria-label="settings" style = {{ display: "flex", marginLeft: "auto"}} onClick = {handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id = "option_menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
                            <MenuItem onClick = {handleDeleteClick}>{t("delete")}</MenuItem>
                            {/*<MenuItem onClick = {handleModifyClick}>{t("modify")}</MenuItem>*/}
                        </Menu>
                    </CardMedia>
                </CardActionArea>
            </Card>
            <h2>{price}</h2>
        </div>
    );
}

export default ClosetCard;