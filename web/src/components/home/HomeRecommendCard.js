import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";

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
    const {title, content, cost, image_id, id } = props
    const [checked, setChecked] = useState(false)
    useEffect(()=> {
        axios.get(`http://localhost:3000/coordination/check/favorite/${id}`, { withCredentials: true })
            .then( response => {
                if (response.data.result) {
                    setChecked(true);
                    console.log(response.data.result);
                }
                else {
                    setChecked(false);
                }
            })
    })
    const onFavoriteChange = (e) => {
        console.log(e.target.checked)
        if(e.target.checked) {
            axios.get(`http://localhost:3000/coordination/favorite/${id}`, { withCredentials: true })
                .then( response => {
                    setChecked(true);
                    console.log("찜!!!")
                    console.log(checked)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            axios.get(`http://localhost:3000/coordination/unfavorite/${id}`, {withCredentials: true})
                .then(response => {
                    setChecked(false);
                    console.log("찜취소~!!!!")
                    console.log(checked)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <Card elevation={8} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:3000/coordination/image/${image_id}`}
                    title={title}
                >
                    <div className = "coordi_favorit">
                    <FormControlLabel
                        control={<Checkbox icon={<Favorite />} checkedIcon={<Favorite />} name="checkedH" onChange = {onFavoriteChange} checked={checked}/> }
                    />
                    </div>
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h5" fontWeight="bold">
                        {cost}
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