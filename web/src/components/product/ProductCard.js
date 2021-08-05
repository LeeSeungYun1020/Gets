import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import { MdFavorite } from "react-icons/md";
import HomeRecommendCard from "../home/HomeRecommendCard";

const useStyles = makeStyles({
    root: {
        width: 285,
    },
    media: {
        height: 285,
    },
});

const ProductCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    title={props.title}
                    ><div className = "my_favorit">
                    <FormControlLabel
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                    />
                </div>
                </CardMedia>
                <CardContent>
                    <Typography variant="p" component="p">{props.brand}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <div className="card_info">
                        <div className="card_like">
                            <MdFavorite />
                            <Typography variant="h6" component="h6">{props.like}</Typography>
                        </div>
                            <Typography variant="h5" component="h5" style = {{marginRight: "0", marginLeft:"auto"}}>{props.cost}</Typography>
                    </div>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ProductCard.defaultProps = {
    title: "Title",
    brand: "브랜드",
    like: "25483",
    cost: "99,900"
}

export default ProductCard;