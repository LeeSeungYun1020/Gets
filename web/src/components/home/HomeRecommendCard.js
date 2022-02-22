import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: 294,
        borderRadius: 24,
        marginLeft: "1vw",
        marginRight: "1vw",
        marginBottom: 40,
        fontFamily: "Noto Sans KR"
    },
    media: {
        height: 294,
    },
});

const HomeRecommendCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {title, content, cost, image_id, id} = props
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3000/coordination/check/favorite/${id}`, {withCredentials: true})
            .then(response => {
                if (response.data.result) {
                    setChecked(true);
                } else {
                    setChecked(false);
                }
            })
    })
    const onCardClick = () => {
        history.push({
            pathname: `/closet/coordination/${id}`
        })
    }
    const onFavoriteChange = (e) => {
        console.log(e.target.checked)
        if (e.target.checked) {
            axios.get(`http://localhost:3000/coordination/favorite/${id}`, {withCredentials: true})
                .then(response => {
                    setChecked(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.get(`http://localhost:3000/coordination/unfavorite/${id}`, {withCredentials: true})
                .then(response => {
                    setChecked(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <Card elevation={8} className={classes.root}>
            <CardActionArea>
                <div className="coordi_favorit">
                    <FormControlLabel
                        control={<Checkbox icon={<Favorite/>} checkedIcon={<Favorite/>} name="checkedH"
                                           onChange={onFavoriteChange} checked={checked}
                                           style={{
                                               position: "absolute", zIndex: 1, right: 9, top: 9, borderRadius: "50%",
                                               background: "#ffffff"
                                           }}/>}
                    />
                </div>
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:3000/coordination/image/${image_id}`}
                    title={title}
                    onClick={onCardClick}
                    style={{
                        position: 'relative'
                    }}
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h5" fontWeight="bold">
                        {cost.toLocaleString()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

HomeRecommendCard.defaultProps = {
    title: "Title",
    content: "Type something",
    cost: "98,900"
}

export default HomeRecommendCard;