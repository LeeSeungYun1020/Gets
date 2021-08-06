import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import { MdFavorite } from "react-icons/md";

const useStyles = makeStyles({
    root: {
        width: 230,
    },
    media: {
        height: 230,
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
                    control={<Checkbox icon={<Favorite />} checkedIcon={<Favorite />} name="checkedH" />}
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